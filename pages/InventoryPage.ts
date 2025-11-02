import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class InventoryPage extends BasePage {
  // Locators
  readonly pageTitle: Locator
  readonly inventoryContainer: Locator
  readonly shoppingCart: Locator
  readonly menuButton: Locator

  constructor(page: Page) {
    super(page)
    this.pageTitle = page.getByText('Swag Labs')
    this.inventoryContainer = page.locator('[data-test="inventory-container"]')
    this.shoppingCart = page.locator('#shopping_cart_container')
    this.menuButton = page.locator('#react-burger-menu-btn')
  }

  async expectToBeOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/inventory\.html/)
    await expect(this.pageTitle).toBeVisible()
    await expect(this.inventoryContainer).toBeVisible()
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.locator(`[data-test="inventory-item-name"]:has-text("${productName}")`).click()
  }

  async verifyProductImage(productName: string): Promise<void> {
    const imageLocator = this.page.locator(
      `[data-test="item-${productName.toLowerCase().replace(/\s+/g, '-')}-img"]`,
    )
    await expect(imageLocator).toBeVisible()
    await expect(imageLocator).toHaveAttribute('alt', productName)
    const isLoaded = await imageLocator.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalHeight > 0
    })
    expect(isLoaded).toBe(true)
  }
}
