import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly inputBox: Locator
  readonly todoItems: Locator

  constructor(page: Page) {
    super(page)
    this.inputBox = page.locator('#input-add')
    this.todoItems = page.locator('.todo-item:not(.has-text-danger)')
  }

  async goto() {
    await this.page.goto('https://techglobal-training.com/frontend/project-6')
  }

  async addTodo(text: string) {
    await this.inputBox.fill(text)
    await this.inputBox.press('Enter')
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text })
    await todo.hover()
    await todo.locator('.destroy').click()
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover()
      await this.todoItems.locator('.destroy').first().click()
    }
  }
}