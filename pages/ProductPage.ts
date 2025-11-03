import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductPage extends BasePage {
  // Locators
  readonly productName: Locator
  readonly productDescription: Locator
  readonly productPrice: Locator
  readonly addToCart: Locator
  readonly removeFromCart: Locator
  readonly shoppingBadge: Locator
  readonly shoppingCart: Locator

  constructor(page: Page) {
    super(page)
    this.productName = page.locator('[data-test="inventory-item-name"]')
    this.productDescription = page.locator('[data-test="inventory-item-desc"]')
    this.productPrice = page.locator('[data-test="inventory-item-price"]')
    this.addToCart = page.locator('[data-test="add-to-cart"]')
    this.removeFromCart = page.locator('[data-test="remove"]')
    this.shoppingBadge = page.locator('[data-test="shopping-cart-badge"]')
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]')
  }

  async verifyProductPageDetails(
    productName: string,
    productDescription: string,
    productPrice: number,
  ): Promise<void> {
    //check that product image has loaded for the correct product
    const imageLocator = this.page.locator(
      `[data-test="item-${productName.toLowerCase().replace(/\s+/g, '-')}-img"]`,
    )
    await expect(imageLocator).toBeVisible()
    await expect(imageLocator).toHaveAttribute('alt', productName)
    const isLoaded = await imageLocator.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalHeight > 0
    })
    expect(isLoaded).toBe(true)
    //check exact product name, description and price is the expected one
    await expect(this.productName).toHaveText(productName)
    await expect(this.productDescription).toHaveText(productDescription)
    await expect(this.productPrice).toHaveText('$' + productPrice.toString())
    await expect(this.addToCart).toBeVisible()
  }

  async addProductToCart(): Promise<void> {
    await this.addToCart.click()
  }

  async verifyRemoveButton(): Promise<void> {
    //check add to cart button changed to remove
    await expect(this.removeFromCart).toBeVisible()
    expect(await this.removeFromCart.isEnabled()).toBe(true)
  }

  async goToShoppingCart(): Promise<void> {
    await this.shoppingCart.click()
  }
}
