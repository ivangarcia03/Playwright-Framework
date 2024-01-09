import test from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Element State', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Html Elements')
  })

  test('Getting Element State', async ({ page }) => {
    const registerButton = page.getByRole('button', { name: 'Register' })
    const signInButton = page.getByRole('button', { name: 'Sign in' })
    const buttonMessage = page.locator('.mt-1')

    const registerButtonState = await registerButton.isEnabled()
    const isMessageVisible = await buttonMessage.isVisible()

    // Playwright automatically will check the element state, this is just for demonstration purposes
    isMessageVisible ? await signInButton.click() : await registerButton.click()
  })

  test('Getting Element State -  Checkbox and Radio Buttons', async ({ page }) => {
    const apple = page.getByRole('checkbox', { name: 'Apple' })
    const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    const tesla = page.locator('#checkbox_3')

    await apple.check()

    const isAppleChecked = await apple.isChecked()

    if (isAppleChecked) {
      await microsoft.check()
      await tesla.check()
    } else {
      await apple.check()
    }
  })
})
