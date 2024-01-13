import { test, expect } from '@playwright/test'
import takeAndCompareScreenshot from '../../helpers/takeAndCompareScreenshot'

test.describe('Visual Regression', () => {
  test('Should take a screenshot of the page', async ({ page }) => {
    await page.goto('https://techglobal-training.com/')

    // await page.locator('.HomePage_right__l17mc').last().scrollIntoViewIfNeeded()

    await expect(page).toHaveScreenshot()
  })

  test('Should take a screenshot of the web element', async ({ page }) => {
    await page.goto('https://techglobal-training.com/')

    const section = page.locator('.HomePage_innerHero__VRFkI')

    await expect(section).toHaveScreenshot()
  })

  test('Should take a screenshot of the full page page', async ({ page }) => {
    await page.goto('https://techglobal-training.com/')

    // await page.locator('.HomePage_right__l17mc').last().scrollIntoViewIfNeeded()

    await expect(page).toHaveScreenshot('fullHomePage.png', { fullPage: true })
  })

  test('Should take a screenshot and mask web elements', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')
    const cards = page.locator('.SubPageLayout_wrapper__hs6Iw')
    const card8 = page.locator('#card-8')
    const card13 = page.locator('#card-13')

    await expect(cards).toHaveScreenshot('frontendCards.png', { mask: [card8, card13] })
  })

  test('take a screenshot and validate', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')
    const cards = page.locator('.SubPageLayout_wrapper__hs6Iw')
    const card8 = page.locator('#card-8')
    const card13 = page.locator('#card-13')

    const snap = await cards.screenshot({ mask: [card8, card13] })

    expect(snap).toMatchSnapshot('frontendCards_2.png')
  })

  test('should compare screenshot using method', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')
    const cards = page.locator('.SubPageLayout_wrapper__hs6Iw')

    await cards.waitFor({ state: 'visible' })

    await takeAndCompareScreenshot.call(this, page)

    await takeAndCompareScreenshot(cards, 'allCards.png')

    await takeAndCompareScreenshot(cards, 'allCardsMasked.png', { mask: [page.locator('#card-7')] })
  })
})