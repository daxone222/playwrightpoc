import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class InventoryPage extends BasePage {
  // Locators
  readonly title: Locator
  readonly inventoryContainer: Locator
  readonly shoppingCart: Locator
  readonly menuButton: Locator

  constructor(page: Page) {
    super(page)
    this.title = page.getByText('Swag Labs')
    this.inventoryContainer = page.locator('[data-test="inventory-container"]')
    this.shoppingCart = page.locator('#shopping_cart_container')
    this.menuButton = page.locator('#react-burger-menu-btn')
  }

  async expectToBeOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/inventory\.html/)
    await expect(this.title).toBeVisible()
    await expect(this.inventoryContainer).toBeVisible()
  }
}
