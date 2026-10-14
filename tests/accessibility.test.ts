import { styleText } from "node:util";
import { expect } from "@playwright/test";
import { getSitemap, localURL, test } from "./accessibility";
import { AXE_ATTACHMENT } from "./axe-reporter";

const urls = await getSitemap();

function formatImpact(impact: string | null | undefined) {
  if (!impact) {
    return "unknown";
  }

  const impactKey: Record<string, string> = {
    critical: styleText("red", impact),
    minor: styleText("blue", impact),
    moderate: styleText("yellowBright", impact),
    serious: styleText("yellow", impact),
  };

  return impactKey[impact] ?? impact;
}

for (const url of urls) {
  const { pathname } = new URL(url);
  const pageURL = `${localURL}${pathname}`;
  const pageLabel = pathname === "/" ? "homepage" : pathname;

  test(`Testing for accessibility violations on ${pageLabel}.`, async ({
    page,
    makeAxeBuilder,
  }, testInfo) => {
    await page.goto(pageURL, { waitUntil: "networkidle" });

    const results = await makeAxeBuilder().analyze();
    const { violations } = results;

    // Picked up by tests/axe-reporter.ts to build the SARIF log and summary.
    // Passes and inapplicable rules are dropped to keep the attachment small.
    await testInfo.attach(AXE_ATTACHMENT, {
      body: JSON.stringify({ ...results, inapplicable: [], passes: [] }),
      contentType: "application/json",
    });
    const reportMessage = `Found ${violations.length} accessibility violations on ${pageLabel}.`;

    if (violations.length === 0) {
      expect(violations, reportMessage).toHaveLength(0);
      return;
    }

    const violationLog = violations
      .map((violation, violationIndex) => {
        const nodes = violation.nodes
          .map(
            (node, nodeIndex) => `
${styleText("redBright", `  Node ${nodeIndex + 1} HTML:`)} ${node.html}
${styleText("redBright", `  Node ${nodeIndex + 1} CSS:`)} ${node.target.join(", ")}
${styleText("green", "  Suggested fix:")}
  ${node.failureSummary ?? "No failure summary provided."}`
          )
          .join("\n");

        return `
${styleText(["redBright", "bold"], `Violation ${violationIndex + 1}:`)}
${styleText("redBright", "  Violation ID:")} ${violation.id}
${styleText("redBright", "  Violation Impact:")} ${formatImpact(violation.impact)}
${styleText("redBright", "  Violation Description:")} ${violation.help}
${styleText("redBright", "  More info:")} ${violation.helpUrl}
${nodes}`;
      })
      .join("\n\n");

    throw new Error(`${violationLog}\n\n${reportMessage}`);
  });
}
