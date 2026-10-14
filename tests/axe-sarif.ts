import { createHash } from "node:crypto";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import type {
  Location,
  Log,
  Message,
  ReportingDescriptor,
  Result,
} from "sarif";

const paramDirectory = /^\[.+\]$/;
const rootLayout = path.join("src", "routes", "+layout.svelte");

const fingerprint = (...parts: (string | undefined)[]) =>
  createHash("sha256").update(parts.join("\0")).digest("hex");

/**
 * Converts a repo-relative path to a SARIF URI. `encodeURI` escapes the
 * brackets in SvelteKit `[param]` directories but leaves `+` alone.
 */
const toSarifUri = (file: string) => encodeURI(file.split(path.sep).join("/"));

const isFile = (file: string) => existsSync(file) && statSync(file).isFile();

/**
 * Maps a site pathname to the repo file that renders it. GitHub code scanning
 * only accepts locations inside the repository, not page URLs.
 *
 * - Docs pages resolve to their Markdown source in `src/content/docs`.
 * - Everything else resolves to the closest `+page.svelte` under
 *   `src/routes`, preferring static directories over `[param]` ones.
 * - Falls back to the root layout if nothing matches.
 */
export function sourceFileForPath(pathname: string, root = process.cwd()) {
  const segments = pathname.split("/").filter(Boolean).map(decodeURIComponent);

  const [first, section, slug] = segments;
  if (first === "docs" && section && slug && segments.length === 3) {
    const doc = path.join("src", "content", "docs", section, `${slug}.md`);
    if (isFile(path.join(root, doc))) {
      return doc;
    }
  }

  let dir = path.join("src", "routes");
  for (const segment of segments) {
    const absoluteDir = path.join(root, dir);
    if (existsSync(path.join(absoluteDir, segment))) {
      dir = path.join(dir, segment);
      continue;
    }

    const param = readdirSync(absoluteDir, { withFileTypes: true }).find(
      (entry) => entry.isDirectory() && paramDirectory.test(entry.name)
    );
    if (!param) {
      return rootLayout;
    }
    dir = path.join(dir, param.name);
  }

  const page = path.join(dir, "+page.svelte");
  return isFile(path.join(root, page)) ? page : rootLayout;
}

/** Appends the page URL, selector, and rendered HTML to an alert message. */
function withPageContext(
  message: Message,
  url: string,
  selector: string | undefined,
  html: string | undefined
): Message {
  const context = [
    `Page: ${url}`,
    selector ? `Element: ${selector}` : undefined,
    html ? `HTML: ${html}` : undefined,
  ].filter(Boolean);

  const markdownContext = [
    `**Page:** ${url}`,
    selector ? `**Element:** \`${selector}\`` : undefined,
    html ? `**HTML:**\n\`\`\`html\n${html}\n\`\`\`` : undefined,
  ].filter(Boolean);

  return {
    ...message,
    markdown: [message.markdown ?? message.text, ...markdownContext].join(
      "\n\n"
    ),
    text: [message.text, ...context].join("\n"),
  };
}

export interface ScannedPage {
  /** Repo-relative path of the file that renders the page. */
  file: string;
  /** Public URL of the page, shown in the alert message. */
  url: string;
}

/**
 * Merges several single-page SARIF logs into one run. GitHub code scanning
 * rejects uploads containing multiple runs for the same tool and category, so
 * rule and artifact indexes are re-mapped onto a shared table.
 */
export class SarifRunMerger {
  private readonly artifactUris: string[] = [];
  private base: Log | undefined;
  private readonly results: Result[] = [];
  private readonly rules = new Map<string, ReportingDescriptor>();

  add(log: Log, page: ScannedPage) {
    this.base ??= log;
    const [run] = log.runs;
    const uri = toSarifUri(page.file);

    for (const result of run?.results ?? []) {
      if (result.kind !== "fail") {
        continue;
      }

      const rule =
        result.ruleIndex === undefined
          ? undefined
          : run?.tool.driver.rules?.[result.ruleIndex];
      const [location] = result.locations ?? [];
      const selector = location?.logicalLocations?.[0]?.fullyQualifiedName;
      const html = location?.physicalLocation?.region?.snippet?.text;

      this.results.push({
        ...result,
        locations: [this.fileLocation(uri, location)],
        message: withPageContext(result.message, page.url, selector, html),
        partialFingerprints: {
          "axeElement/v1": fingerprint(result.ruleId, page.url, selector),
        },
        ruleIndex: rule ? this.ruleIndex(rule) : undefined,
      });
    }
  }

  toLog(): Log {
    const [baseRun] = this.base?.runs ?? [];
    if (!(this.base && baseRun)) {
      throw new Error("Unable to build SARIF log: no axe results converted.");
    }

    return {
      ...this.base,
      runs: [
        {
          ...baseRun,
          artifacts: this.artifactUris.map((uri) => ({ location: { uri } })),
          invocations: undefined,
          results: this.results,
          tool: {
            ...baseRun.tool,
            driver: {
              ...baseRun.tool.driver,
              rules: [...this.rules.values()],
            },
          },
        },
      ],
    };
  }

  private ruleIndex(rule: ReportingDescriptor) {
    if (!this.rules.has(rule.id)) {
      this.rules.set(rule.id, rule);
    }
    return [...this.rules.keys()].indexOf(rule.id);
  }

  private fileLocation(uri: string, original: Location | undefined): Location {
    if (!this.artifactUris.includes(uri)) {
      this.artifactUris.push(uri);
    }

    return {
      // Keep the CSS selector as a logical location for reference.
      logicalLocations: original?.logicalLocations,
      physicalLocation: {
        artifactLocation: { index: this.artifactUris.indexOf(uri), uri },
        region: { startLine: 1 },
      },
    };
  }
}
