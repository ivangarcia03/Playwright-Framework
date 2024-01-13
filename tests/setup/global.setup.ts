import { test as setup, expect, chromium } from '@playwright/test'

// async function globalSetup(){

//     const browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await page.goto("https://demoblaze.com/");

//     await page.locator("#login2").click();
//     await page.locator("#loginusername").fill("test");
//     await page.locator("#loginpassword").fill("test");
//     await page.locator('[onclick="logIn()"]').click();
//     await expect(page.locator("#logout2")).toBeVisible({ timeout: 30000 });

//     // Storing the login auth in a file for later use
//     await page.context().storageState({ path: './user-data/loginAuth.json' });

//     await page.close();
// }

setup('do login', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  await page.locator('#login2').click()
  await page.locator('#loginusername').fill('test')
  await page.locator('#loginpassword').fill('test')
  await page.locator('[onclick="logIn()"]').click()
  await expect(page.locator('#logout2')).toBeVisible({ timeout: 30000 })

  await page.context().storageState({ path: './user-data/loginAuth.json' })
})

// export default globalSetup;