import { test, expect } from '@playwright/test'

test('Sauce demo login page design check @playwrightVisual', async ({ page }) => {
  await page.goto('')
  await expect(page).toHaveScreenshot('login.png')
  await expect(page.locator('[data-test="login-button"]')).toHaveScreenshot('login-button.png');
})

test.afterEach(async () => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`)
})