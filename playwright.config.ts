import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env["CI"];

export default defineConfig({
  forbidOnly: isCI,
  fullyParallel: true,
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
      },
    },
  ],
  reporter: "list",
  testDir: "./tests",
  testMatch: /.*\.test\.ts/,
  // The timeout for the accessibility tests only.
  timeout: 180 * 1_000,
  webServer: [
    {
      command: "bun run preview:test",
      reuseExistingServer: !isCI,
      // The timeout of the single build step ran before the accessibility tests.
      timeout: 120 * 1_000,
      url: "http://localhost:8787",
    },
  ],
});
