import { type Locator, type Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly logo: Locator
  readonly navigationDropdown: Locator
  readonly mainHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.logo = page.locator('#logo')
    this.navigationDropdown = page.locator('#dropdown-menu')
    this.mainHeading = page.locator('#main_heading')
  }

  async selectDropdownOption(option: string) {
    await this.navigationDropdown.locator(`a:has-text("${option}")`).click()
  }
}