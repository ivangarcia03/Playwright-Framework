import { expect, Locator } from '@playwright/test'

/**
 * Takes a screenshot and compares it with a baseline image.
 *
 * @param locator - playwright Locator, can be page instance as well
 * @param fileName - Optional name for the snapshot file. If not provided, a default name is used
 * @param options  - Options for the screenshot (https://playwright.dev/docs/api/class-locator#locator-screenshot)
 */
async function takeAndCompareScreenshot(locator: Locator, fileName?: string, options = {}): Promise<void> {
  const screenshot = await locator.screenshot(options)

  expect(screenshot).toMatchSnapshot(fileName, { threshold: 0.2 })
}

export default takeAndCompareScreenshot