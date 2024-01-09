import test from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('User Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Html Elements')
  })

  test('User Actions - Click and Hover', async ({ page }) => {
    const dropdownButton = page.locator('#dropdown-button')

    await dropdownButton.hover()

    await clickButton(page, 'Register')
  })

  test('User Actions - Type', async ({ page }) => {
    const textInput1 = page.locator('#text_input1')

    console.log(await page.viewportSize())
    // Normally it would type "CypressPlaywright"
    await textInput1.fill('Cypress')
    await textInput1.fill('Playwright')
  })

  test('User Actions - Checkbox and Radio Buttons', async ({ page }) => {
    const apple = page.getByRole('checkbox', { name: 'Apple' })
    const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    const tesla = page.getByRole('checkbox', { name: 'Tesla' })

    await apple.check()
    await apple.uncheck()

    // const checkBoxGroup = page.locator('#checkbox-button-group input')

    // const checkboxCount = await checkBoxGroup.count();

    // for(let i = 0; i < checkboxCount; i++){
    //     await checkBoxGroup.nth(i).check()
    //     await checkBoxGroup.nth(i).uncheck()
    // }

    const checkBoxGroup2 = await page.locator('#checkbox-button-group input').all()

    for (const check of checkBoxGroup2) {
      await check.check()
      await check.uncheck()
    }

    // checkBoxGroup2.forEach( async (el) => {
    //     await el.check()
    //     await el.uncheck()
    // })
  })

  test('User Actions - Dropdowns', async ({ page }) => {
    const companyDropdown = page.locator('#company_dropdown1')

    // Select the option with the index of 1
    await companyDropdown.selectOption({ index: 1 })

    // Select the option with the text
    await companyDropdown.selectOption({ label: 'Apple' })

    // Select the option with the value attribute
    await companyDropdown.selectOption({ value: 'Tesla' })
  })
})
