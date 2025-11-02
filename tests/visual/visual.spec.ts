import { test, expect } from '@playwright/test'

test('Playwright Home Page Test @playwrightVisual', async ({ page }) => {
  await page.goto('https://playwright.dev')
  await expect(page).toHaveScreenshot('home.png')
  await expect(page.getByRole('link', { name: 'Get started' })).toHaveScreenshot(
    'get-started-btn.png',
  )
})
