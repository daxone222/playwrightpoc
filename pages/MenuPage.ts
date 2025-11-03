import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class MenuPage extends BasePage {
  // Locators
  readonly shoppingBadge: Locator
  readonly shoppingCart: Locator

  constructor(page: Page) {
    super(page)
    this.shoppingBadge = page.locator('[data-test="shopping-cart-badge"]')
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]')
  }

  async goToShoppingCart(): Promise<void> {
    await this.shoppingCart.click()
  }

  async verifyShoppingBadgeUpdated(items: number): Promise<void> {
    await this.shoppingBadge.isVisible()
    expect(this.shoppingBadge).toHaveText(items.toString())
  }
}
