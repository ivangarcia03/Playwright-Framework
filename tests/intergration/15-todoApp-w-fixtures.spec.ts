import { test, expect } from '../../fixtures/todo-fixture'

test.describe('todo tests', () => {
  test('should add an item', async ({ todoPage, page }) => {
    await todoPage.addTodo('my item')
    await todoPage.addTodo('nice item')

    await expect(page.locator('.mr-auto')).toContainText('nice item')
  })

  test('should remove an item', async ({ todoPage }) => {
    await todoPage.remove('item1')
  })
})