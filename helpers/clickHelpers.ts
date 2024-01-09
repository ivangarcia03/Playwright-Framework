import { Page } from '@playwright/test'

/**
 * Clicks the link by its visual text.
 *
 * @param page - Page context
 * @param linkText - visual text of link
 */

async function clickLink(page: Page, linkText: string): Promise<void> {
  await page.getByRole('link', { name: linkText }).click()
}

/**
 * Clicks the button by its visual text.
 *
 * @param page - Page context
 * @param buttonText  - visual text of button
 */

async function clickButton(page: Page, buttonText: string): Promise<void> {
  await page.getByRole('button', { name: buttonText }).click()
}

export { clickLink, clickButton }
