import { test, chromium } from "@playwright/test";

// test block here will trigger the test runner
test("Playwright 101 - Test Case", () => {
  console.log("techglobal");
});

// test runner will trigger the browser context
// using { page } fixture
test("Playwright 101 -  Test Case 2", ({ page }) => {
    // test to be executed
});

test('Playwright 101 - Test Case 3', async ({ page }) => {
    await page.goto('https://techglobal-training.com')
})

test.only('Playwright 101 - Test Case | Browser Context', async ({ browser }) => {

    // Create a new incognito browser context
    const context = await browser.newContext()

    // Create a new page inside the context
    const page = await context.newPage()

    await page.goto('https://techglobal-training.com')

    await context.close()
})

test('Playwright 101 - Manual trigger', async () => {

        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://techglobal-training.com')

        await context.close()

})