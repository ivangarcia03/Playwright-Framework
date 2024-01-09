import { test, expect } from '@playwright/test'
test.describe('First test suide', () => {
  test('Refresh, navigate back and forward', async ({ page }) => {
    // Navigate to URL
    await page.goto('https://techglobal-training.com')
    // Refresh the page
    await page.reload()
    await page.goto('https://techglobal-training.com/frontend')
    // Navigate back
    await page.goBack()
    // Navigate Forward
    await page.goForward()
  })
  test('Validate page Title', async ({ page }) => {
    await page.goto('https://techglobal-training.com')
    const title = await page.title()
    // 1st way to assert Title
    expect(title).toBe('TechGlobal Training | Home')
    // 2nd way to assert Title
    await expect(page).toHaveTitle('TechGlobal Training | Home', { timeout: 20000 })
  })
  test('Validate page URL', async ({ page }) => {
    await page.goto('https://techglobal-training.com')
    const title = page.url()
    // 1st way to assert Title
    expect(title).toBe('https://techglobal-training.com/')
    // 2nd way to assert Title
    await expect(page).toHaveURL('https://techglobal-training.com', { timeout: 20000 })
  })
  test('My First Test', async ({ page }) => {
    await page.goto('https://techglobal-training.com')
    const myLogo = page.locator('#logo')
    await myLogo.click()
    // validate logo is visible
    await expect(myLogo).toBeVisible()
  })
})
