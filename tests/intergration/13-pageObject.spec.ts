import { test, expect } from '../../fixtures/page-object-fixtures'
// import { LoginPage } from '../../pages/LoginPage'

test.describe('Test @Smoke', () => {
  //   let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page)
    await page.goto('/frontend/project-2')
  })

  //   test('Test Positive', async () => {
  //     await loginPage.userLogin(process.env.USERNAME, process.env.PASSWORD)
  //     await loginPage.loginMessage.waitFor({ state: 'visible' })
  //     await expect(loginPage.loginMessage).toHaveText('You are logged in')
  //   })

  //   test('Test Negative', async () => {
  //     await loginPage.userLogin('error', 'error')
  //     await loginPage.errorMessage.waitFor({ state: 'visible' })
  //     await expect(loginPage.errorMessage).toHaveText('Invalid Username entered!')
  //   })

  test('Test Positive', async ({ loginPage }) => {
    await loginPage.userLogin(process.env.USERNAME, process.env.PASSWORD)
    await loginPage.loginMessage.waitFor({ state: 'visible' })
    await expect(loginPage.loginMessage).toHaveText('You are logged in')
  })

  test('Test Negative', async ({ loginPage }) => {
    await loginPage.userLogin('error', 'error')
    await loginPage.errorMessage.waitFor({ state: 'visible' })
    await expect(loginPage.errorMessage).toHaveText('Invalid Username entered!')
  })
})