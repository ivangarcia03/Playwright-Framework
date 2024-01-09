import test from '@playwright/test'
import { TodoPage } from '../../pages/TodoPage'

test.describe('todo tests', () => {
  let todoPage: TodoPage

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)
    await todoPage.goto()
    // await page.pause()
    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')
  })

  test.afterEach(async () => {
    await todoPage.removeAll()
  })

  test('should add an item', async () => {
    await todoPage.addTodo('My Item')
  })

  test('should remove an item', async () => {
    await todoPage.remove('item1')
  })
})