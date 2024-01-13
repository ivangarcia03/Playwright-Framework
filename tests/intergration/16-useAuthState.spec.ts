import { test, expect } from '@playwright/test'

// test.use({
//   storageState: 'authorization.json',
// })

test('test 1', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  console.log('signed in')
  await expect(page.locator('#nameofuser')).toBeVisible()
})

test('test 2', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  console.log('signed in')
  await expect(page.locator('#nameofuser')).toBeVisible()
})