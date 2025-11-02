import { test, expect } from '@playwright/test';


test('First Login Test @firstLoginTest', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator("#user-name").fill("standard_user");
 await page.locator("#password").fill("secret_sauce")
 await page.locator('[data-test="login-button"]').click();
 expect(page.url()).toContain("/inventory.html");
 await expect(page.getByText("Swag Labs")).toBeVisible();
});

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('dragos');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('passowr');
    await page.locator('[data-test="login-button"]').click();
  });
