import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class WaitsPage extends BasePage {
  readonly redBoxButton: Locator
  readonly blueboxButton: Locator
  readonly redbox: Locator
  readonly bluebox: Locator

  constructor(page: Page) {
    super(page)
    this.redBoxButton = page.locator('#red')
    this.blueboxButton = page.locator('#blue')
    this.redbox = page.locator('.has-background-danger')
    this.bluebox = page.locator('[class^="Waits_blue_box"')
  }

  async clickRedBoxButton() {
    await this.redBoxButton.click()
  }

  async clickBlueBoxButton() {
    await this.blueboxButton.click()
  }
}