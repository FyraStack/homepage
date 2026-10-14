import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type AxeBuilder from "@axe-core/playwright";
import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import { convertAxeToSarif } from "axe-sarif-converter";
import type { Log } from "sarif";
import { siteUrl } from "../src/lib/site.ts";
import { SarifRunMerger, sourceFileForPath } from "./axe-sarif.ts";

type AxeResults = Awaited<ReturnType<AxeBuilder["analyze"]>>;
type AxeViolation = AxeResults["violations"][number];
type AxeNode = AxeViolation["nodes"][number];

/** Name of the test attachment that holds the raw axe results for a page. */
export const AXE_ATTACHMENT = "axe-results";

interface AxeReporterOptions {
  /** Directory the SARIF log and Markdown summary are written to. */
  outputDir?: string;
}

interface MergedViolation {
  nodes: Map<string, { node: AxeNode; projects: Set<string> }>;
  violation: AxeViolation;
}

const impactOrder = ["critical", "serious", "moderate", "minor"];

const impactRank = (impact: string | null | undefined) => {
  const rank = impactOrder.indexOf(impact ?? "");
  return rank === -1 ? impactOrder.length : rank;
};

const plural = (count: number, noun: string, bold = false) => {
  const value = bold ? `**${count}**` : `${count}`;
  return `${value} ${noun}${count === 1 ? "" : "s"}`;
};

const pathnameOf = (url: string) => new URL(url).pathname;

const nodeKey = (node: AxeNode) => node.target.join(" ");

const escapeMarkdown = (value: string) =>
  value.replaceAll("|", "\\|").replaceAll("\n", " ");

/**
 * Collects the axe results attached by `accessibility.test.ts`, merges them
 * across browser projects, and writes:
 * - `axe.sarif`: a single-run SARIF log for GitHub code scanning
 * - `summary.md`: a Markdown report, appended to `$GITHUB_STEP_SUMMARY`
 */
export default class AxeReporter implements Reporter {
  private readonly outputDir: string;
  // page URL -> rule id -> merged violation
  private readonly pages = new Map<string, Map<string, MergedViolation>>();
  // page URL -> last full axe result seen for it (used as the SARIF base)
  private readonly pageResults = new Map<string, AxeResults>();

  constructor(options: AxeReporterOptions = {}) {
    this.outputDir = path.resolve(options.outputDir ?? "a11y-report");
  }

  printsToStdio() {
    return false;
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const attachment = result.attachments.find(
      ({ name }) => name === AXE_ATTACHMENT
    );
    if (!attachment?.body) {
      return;
    }

    const project = test.parent.project()?.name ?? "default";
    const axeResults = JSON.parse(attachment.body.toString()) as AxeResults;
    this.pageResults.set(axeResults.url, axeResults);

    const rules = this.pages.get(axeResults.url) ?? new Map();
    this.pages.set(axeResults.url, rules);

    for (const violation of axeResults.violations) {
      const merged: MergedViolation = rules.get(violation.id) ?? {
        nodes: new Map(),
        violation,
      };
      rules.set(violation.id, merged);

      for (const node of violation.nodes) {
        const entry = merged.nodes.get(nodeKey(node)) ?? {
          node,
          projects: new Set<string>(),
        };
        entry.projects.add(project);
        merged.nodes.set(nodeKey(node), entry);
      }
    }
  }

  async onEnd(_result: FullResult) {
    if (this.pageResults.size === 0) {
      return;
    }

    await mkdir(this.outputDir, { recursive: true });

    const summary = this.buildSummary();
    await Promise.all([
      writeFile(
        path.join(this.outputDir, "axe.sarif"),
        `${JSON.stringify(this.buildSarif(), null, 2)}\n`
      ),
      writeFile(path.join(this.outputDir, "summary.md"), summary),
    ]);

    const stepSummary = process.env.GITHUB_STEP_SUMMARY;
    if (stepSummary) {
      await appendFile(stepSummary, summary);
    }
  }

  /** Converts each page to SARIF, then merges everything into one run. */
  private buildSarif(): Log {
    const merger = new SarifRunMerger();

    for (const [url, pageResult] of this.pageResults) {
      const violations = [...(this.pages.get(url)?.values() ?? [])].map(
        ({ violation, nodes }) => ({
          ...violation,
          nodes: [...nodes.values()].map(({ node }) => node),
        })
      );

      // Only violations are reported; passes and inapplicable rules would
      // otherwise bloat the log with thousands of "pass" results.
      const { pathname, search, hash } = new URL(url);
      merger.add(
        convertAxeToSarif({
          ...pageResult,
          inapplicable: [],
          incomplete: [],
          passes: [],
          violations,
        }),
        {
          file: sourceFileForPath(pathname),
          url: new URL(`${pathname}${search}${hash}`, siteUrl).href,
        }
      );
    }

    return merger.toLog();
  }

  private buildSummary() {
    const byRule = new Map<
      string,
      { elements: number; pages: Set<string>; violation: AxeViolation }
    >();

    for (const [url, rules] of this.pages) {
      for (const { violation, nodes } of rules.values()) {
        const entry = byRule.get(violation.id) ?? {
          elements: 0,
          pages: new Set<string>(),
          violation,
        };
        entry.elements += nodes.size;
        entry.pages.add(pathnameOf(url));
        byRule.set(violation.id, entry);
      }
    }

    const totalElements = [...byRule.values()].reduce(
      (total, { elements }) => total + elements,
      0
    );
    const failingPages = [...this.pages.values()].filter(
      (rules) => rules.size > 0
    ).length;

    const lines = ["## Accessibility (axe)", ""];

    if (byRule.size === 0) {
      lines.push(
        `✅ No accessibility violations found across ${plural(this.pageResults.size, "page")}.`,
        ""
      );
      return lines.join("\n");
    }

    lines.push(
      `❌ Found ${plural(byRule.size, "rule violation", true)} affecting ${plural(totalElements, "element", true)} on **${failingPages}** of ${plural(this.pageResults.size, "page")}.`,
      "",
      "| Rule | Impact | Pages | Elements | Description |",
      "| --- | --- | --: | --: | --- |"
    );

    const sortedRules = [...byRule.values()].sort(
      (a, b) =>
        impactRank(a.violation.impact) - impactRank(b.violation.impact) ||
        b.elements - a.elements
    );
    for (const { violation, pages, elements } of sortedRules) {
      lines.push(
        `| [\`${violation.id}\`](${violation.helpUrl}) | ${violation.impact ?? "unknown"} | ${pages.size} | ${elements} | ${escapeMarkdown(violation.help)} |`
      );
    }

    lines.push("", "### By page", "");

    const sortedPages = [...this.pages].sort(([a], [b]) => a.localeCompare(b));
    for (const [url, rules] of sortedPages) {
      if (rules.size === 0) {
        continue;
      }

      lines.push(
        "<details>",
        `<summary><code>${pathnameOf(url)}</code> (${plural(rules.size, "rule")})</summary>`,
        ""
      );
      for (const { violation, nodes } of rules.values()) {
        lines.push(
          `- **\`${violation.id}\`** (${violation.impact ?? "unknown"}): ${escapeMarkdown(violation.help)}`
        );
        for (const { node, projects } of nodes.values()) {
          lines.push(
            `  - \`${escapeMarkdown(nodeKey(node))}\` (${[...projects].join(", ")})`
          );
        }
      }
      lines.push("", "</details>", "");
    }

    return lines.join("\n");
  }
}
