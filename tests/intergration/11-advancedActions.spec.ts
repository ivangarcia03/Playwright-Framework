import { test, expect } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('Advanced user Actions', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Actions')
  })

  test('Mouse Actions', async ({ page }) => {
    // Double-clicks the element
    await page.dblclick('#double-click')

    // Right-clicks the element
    await page.click('#right-click', { button: 'right' })

    // Drag and element and frop
    await page.dragAndDrop('#drag_element', '#drop_element')

    await page.pause()
  })

  test('Keyboard Actions', async ({ page }) => {
    const inputBox = page.locator('#input_box')

    await inputBox.press('Escape')

    // targets the input box
    await inputBox.focus()

    // await page.keyboard.press('Shift+KeyA+KeyB+KeyC')
    // await page.keyboard.press('ArrowLeft')
    // await page.keyboard.press('KeyA+KeyB+KeyC')
    // await page.keyboard.press('Backspace')

    await page.keyboard.type('Hello World!')
    await page.keyboard.press('ArrowLeft')

    await page.keyboard.down('Shift')
    for (let i = 0; i < 'World'.length; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')
    await page.keyboard.press('Backspace')
  })

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "Actions" card
   * Go to the input box, and remove if there is an existing text inside
   * First, enter "h" to the input box in upper case using keyboard actions
   * Then complete the word by sending "ello" as a key
   * Validate value attribute of the input box is "Hello"
   */
  test('Test Case', async ({ page }) => {
    const inputBox = page.locator('#input_box')
    await inputBox.focus()

    await page.keyboard.press('Shift+KeyH')
    await page.keyboard.type('ello')

    await expect(inputBox).toHaveValue('Hello')
  })

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "Actions" card
   * Go to the input box, and remove if there is an existing text inside
   * Enter "techglobal" to input the box with uppercases
   * Validate the value attribute for the search input box is "TECHGLOBAL"
   * Then, copy the text and paste it again
   * Validate the value attribute for the search input box is "TECHGLOBALTECHGLOBAL"
   */

  test('Test Case 2', async ({ page }) => {
    const inputBox = page.locator('#input_box')
    await inputBox.focus()

    await page.keyboard.down('Shift')
    await page.keyboard.press('KeyT+KeyE+KeyC+KeyH+KeyG+KeyL+KeyO+KeyB+KeyA+KeyL')
    await expect(inputBox).toHaveValue('TECHGLOBAL')
    await page.keyboard.up('Shift')

    await page.keyboard.down('Meta')
    await page.keyboard.press('KeyA+KeyX')

    await page.keyboard.press('KeyV+KeyV')
    await expect(inputBox).toHaveValue('TECHGLOBAL')

    await page.pause()
  })
})
