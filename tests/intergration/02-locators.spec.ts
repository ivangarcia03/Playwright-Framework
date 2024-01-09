import test from '@playwright/test'

test.describe('Playwright locators', () => {
  test('Playwright Locator API', async ({ page }) => {
    await page.goto('https://techglobal-training.com')

    const myLogo = page.locator('#logo')

    await myLogo.click()

    /**
     * Note:
     * Locator API in Playwright is a generic API that can be used to locate any element on the page
     * it can be used to locate elements using different locators strategies like CSS, and XPARH
     */
  })

  test('Playwright - Custom Psuedo Classes', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await page.locator('a', { hasText: 'Html Elements' }).click()
    // await page.locator('a:has-text("Html Elements")').click()

    // These locates the given elements by their text using :text() or :has-text()
    await page.locator('button:text("Register")').highlight()
    await page.locator('button:has-text("Sign in"):visible').highlight()

    // locates the element in the div with id '#apple_check'
    await page.locator('#radio-button-group:has(#java_radio)').highlight()
    // await page.locator('div', { has: page.locator('#apple_check')}).highlight()
  })

  test('Playwright - chaining locators', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await page.locator('a', { hasText: 'Html Elements' }).click()

    const unorderedList = page.locator('#unordered_list')

    const getText = await unorderedList.locator('li:has-text("JavaScript")').textContent()

    console.log(getText + ' name of element')
  })

  test('Playwright - handling multiple elements', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await page.locator('a', { hasText: 'Html Elements' }).click()

    const unorderedList = page.locator('#unordered_list > li')

    await unorderedList.first().click()
    await unorderedList.last().click()
    await unorderedList.nth(1).click()

    const checkBoxGroup = page.locator('#checkbox-button-group input')
    const checkboxCount = await checkBoxGroup.count()

    for (let i = 0; i < checkboxCount; i++) {
      await checkBoxGroup.nth(i).click()
    }

    const checkBoxGroup2 = page.locator('#checkbox-button-group input').all()

    for (const checkBox of await checkBoxGroup2) {
      await checkBox.click()
    }

    // await Promise.all(
    //     (await checkBoxGroup2).map( async (element, index) => {
    //         await element.click()
    //         console.log(index)
    //     })
    // )
  })

  test('Playwright built-in locators', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await page.getByRole('link', { name: 'Html Elements' }).click()

    await page.getByRole('heading', { name: 'Unordered List' }).highlight()

    await page.getByPlaceholder('Enter text here').highlight()
  })

  test('Playwright - filter() locator API', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await page.getByRole('link', { name: 'Html Elements' }).click()

    const testingParagraphs = page.locator('p').filter({ hasText: 'testing' })

    const text = await testingParagraphs.textContent()

    console.log(`Text of the first paragraph: ${text}`)

    const nonLanguageheadings = page.locator('label').filter({ hasNotText: 'Java' })
    const count = await nonLanguageheadings.count()

    console.log(`Numbers of elements that has not text Java is: ${count}`)

    const textOfDiv = page.locator('div').filter({ has: page.locator('h3:has-text("Headings")') })

    const headingItems = await textOfDiv.locator('h4').all()

    for (const heading of headingItems) {
      console.log(await heading.textContent())
    }
  })
})
