import { test, expect } from '../../fixtures/page-object-fixtures'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('timeouts and waits', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend', { timeout: 3000 })

    await clickLink(page, 'Waits')
  })

  // test('Should wait for element to be visible', async ({ waitsPage }) => {
  //   await waitsPage.redBoxButton.click({ timeout: 10000 })
  //   await expect(waitsPage.redbox).toBeVisible({ timeout: 11000 })
  // })

  test('Waits', async ({ dynamicTablesPage, page }) => {
    await page.goto('https://techglobal-training.com/frontend/project-4')

    await dynamicTablesPage.clickAddProductButton()

    await dynamicTablesPage.productModal.waitFor({ state: 'visible' })

    await dynamicTablesPage.closeProductModal()

    // await expect(dynamicTablesPage.productModal).not.toBeVisible()
    await dynamicTablesPage.productModal.waitFor({ state: 'hidden' })
  })
})