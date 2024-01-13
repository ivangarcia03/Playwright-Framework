import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'
dotenv.config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* You can globally setup to run once before your tests */
  // globalSetup: './tests/integration/17-global.setup.ts',

  /* This is where you setup test files to execute */
  testDir: './tests',

  /* Ignores specified tests */
  // testIgnore: ['**/test1.spec.ts', '**/test2.spec.ts'],

  /* Define where you want to hold your snapshots */
  snapshotDir: './snapshots',
  /* Maximum timeout one test can run for */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for  the condition to be met.
     * For example in 'await expect(locator).toHaveText();'
     */
    timeout: 5 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html',
      {
        open: 'never',
        // port: 9000,
        // host: 'none'
        // outputFolder: "./test-results",
      },
    ],
    ['list'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action like 'click()' can take. Defaults to 0 (no limit). */
    // actionTimeout: 5 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Whether to run the browser in headless mode or show the UI. */
    headless: true,
    // storageState: "user-data/loginAuth.json",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
      testIgnore: ['tests/setup/*.ts', 'tests/integration/17-globalSetup.spec.ts'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //      ...devices['Desktop Firefox'],
    //      browserName: 'firefox',
    //   // baseURL: 'http://',
    //   // headless: false,
    //   // trace: 'off',
    // },
    //   // retries: 1,
    //   // fullyParallel: false
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     browserName: 'webkit',
    //  },
    // },

    // /* global setup and teardown */
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
      use: {
        storageState: './user-data/loginAuth.json',
      },
    },
    {
      name: 'loggedIn',
      testMatch: '**/18-globalSetup.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: './user-data/loginAuth.json',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})