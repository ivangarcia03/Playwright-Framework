import { test, expect } from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Annotations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Html Elements')
  })

  // test('Annotations - fail', async ({ page }) => {
  //     test.fail()

  //     const heading = page.locator('#main_heading')

  //     await expect(heading).toHaveText('Html sdfsakdjbfjelkqbfjlkeqw')
  // })

  // test.fixme('Annotations - fixme', async ({ page }) => {
  //     const heading = page.locator('#main_heading')

  //     await expect(heading).toHaveText('Html Elements')
  // })

  test.fixme('Annotations - slow', async ({ page }) => {
    // this will triple the timeout for this test
    test.slow()

    const heading = page.locator('#main_heading')

    await expect(heading).toHaveText('Html Elements')
  })

  /**
   * 1. Go to 'https://techglobal-training.com/frontend'
   * 2. Click on the 'Html Elements' card
   * 3. From the Paragraphs heading
   * 4. Validate Hello World and I Like automation testing! texts are visible
   * 5. Validate their texts are equal to expected texts
   * 6. Validate their id and value
   */

  test('Annotations - step @smoke', async ({ page }, testInfo) => {
    const paragraphs = await page.locator('[data-identifier="Paragraphs"] > p').all()
    console.log(testInfo.error)

    await test.step('1. Go to "https://techglobal-training.com/frontend"', async () => {
      await page.goto('https://techglobal-training.com/frontend')
      console.log(testInfo.title)
    })

    await test.step('2. Click on the "Html Elements" card', async () => {
      await clickLink(page, 'Html Elements')
    })

    await test.step('4. Validate Hello World and I Like automation testing! texts are visible', async () => {
      for (const paragraph of paragraphs) {
        await expect(paragraph).toBeVisible()
      }
    })

    await test.step('5. Validate their texts are equal to expected texts', async () => {
      await expect(page.locator('[data-identifier="Paragraphs"] > p')).toHaveText([
        'Hello World!',
        'I like automation testing!',
      ])
    })
  })
})
