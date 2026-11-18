import { expect, test } from "@playwright/test";
import { localURL } from "./accessibility";

const html = (page: import("@playwright/test").Page) => page.locator("html");

test("high contrast toggle overrides the system setting and persists", async ({
  page,
}) => {
  await page.emulateMedia({ contrast: "no-preference" });
  await page.goto(localURL);
  await expect(html(page)).not.toHaveAttribute("data-contrast");

  const group = page.getByRole("group", { name: "High contrast" });
  await group.getByRole("button", { exact: true, name: "On" }).click();
  await expect(html(page)).toHaveAttribute("data-contrast", "more");

  // Applied before first paint on reload.
  await page.reload();
  await expect(html(page)).toHaveAttribute("data-contrast", "more");

  // "Off" wins even when the system asks for more contrast.
  await page.emulateMedia({ contrast: "more" });
  await group.getByRole("button", { exact: true, name: "Off" }).click();
  await expect(html(page)).not.toHaveAttribute("data-contrast");

  // "Auto" follows the system again.
  await group.getByRole("button", { exact: true, name: "Auto" }).click();
  await expect(html(page)).toHaveAttribute("data-contrast", "more");
});
