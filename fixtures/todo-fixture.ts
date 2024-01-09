import { test as base } from '@playwright/test'
import { TodoPage } from '../pages/TodoPage'

//Declare the types of your fixtures
type MyFixture = {
  todoPage: TodoPage
}

// Extend the base test to include your custom fixtures.
export const test = base.extend<MyFixture>({
  // Define the fixture name and provide the fixture function
  todoPage: async ({ page }, use) => {
    // Create the todoPage fixture instance
    const todoPage = new TodoPage(page)

    // This is the Setup Phase (beforeEach)
    await todoPage.goto()
    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')

    // Test runner pauses the execution to allow your test to perform actions
    await use(todoPage)

    // Teardown logic is here to remove all items.
    await todoPage.removeAll()
  },
})

export { expect } from '@playwright/test'