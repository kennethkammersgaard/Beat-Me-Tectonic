import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__',
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
});
