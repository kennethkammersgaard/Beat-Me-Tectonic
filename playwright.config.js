const { defineConfig } = require('@playwright/test');

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
});
