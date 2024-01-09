import { test, expect } from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Interacting Multiple tabs', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Multiple Windows')
  })

  test('Creating a new tab', async ({ page, context }) => {
    // Use the existing 'page' to navigate to a URL in the new tab
    // const newTab = await page.context().newPage()
    const newTab = await context.newPage()

    // Use the new tab to navigate to different URL
    await newTab.goto('https://www.apple.com/')

    await page.bringToFront()

    await newTab.bringToFront()

    await newTab.close()
  })

  test('Interacting/switching new tab', async ({ page }) => {
    const [newTab] = await Promise.all([page.waitForEvent('popup'), clickLink(page, 'Apple')])

    await expect(newTab).toHaveTitle('Apple')

    const numbers = [1, 2, 3]
    const [first, second] = numbers

    console.log(first)
    console.log(second)

    const [newTab2] = await Promise.all([page.waitForEvent('popup'), clickLink(page, 'Microsoft')])

    await expect(newTab2).toHaveURL('https://www.microsoft.com/en-us/')
  })

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "Multiple Windows" card
   * Click on the "Apple" link and validate URL contains "https://www.apple.com/"
   * Click on the "Microsoft" link and validate URL contains "https://www.microsoft.com/en-us/"
   * Click on the "Tesla" link and validate URL contains "https://www.tesla.com/"
   */

  test('Test case', async ({ page }) => {
    const links = ['Apple', 'Microsoft', 'Tesla']

    for (const link of links) {
      const [newTab] = await Promise.all([page.waitForEvent('popup'), clickLink(page, link)])

      expect(newTab.url()).toContain(link.toLowerCase())
      await newTab.close()
    }
  })
})
