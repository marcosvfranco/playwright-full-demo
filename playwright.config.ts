// @ts-check
import { PlaywrightTestConfig, devices } from '@playwright/test';
import 'dotenv/config';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./configuration/global-setup'),

    use: {
        // baseURL: '',
        headless: (process.env.NOHEADLESS)? false : true,
        // storageState: 'storageState.json',
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        trace: 'on',
        launchOptions: {
            slowMo: 200,
        },
    },
    testDir: 'tests',

    reporter: process.env.CI ? [
        ['dot'],
        ['html', { open: 'never' }] 
    ] : 'list',

    workers: 4,
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'],
            },
        },
    ]

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};

export default config;