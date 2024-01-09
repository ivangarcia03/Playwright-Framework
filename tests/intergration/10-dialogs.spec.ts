import { test, expect } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('Dialogs', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Alerts')
  })

  test('Handling Dialogs', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      if (dialog.type() === 'alert') {
        await dialog.accept()
      } else if (dialog.type() === 'confirm') {
        await dialog.dismiss()
      } else {
        await dialog.accept('My Message')
      }
      console.log(dialog.message())
    })

    await clickButton(page, 'Warning Alert')
    await clickButton(page, 'Confirmation Alert')
    await clickButton(page, 'Prompt Alert')
  })
})
