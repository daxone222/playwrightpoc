import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
  readonly page: Page

  // Locators
  readonly cartList: Locator
  readonly quantityLabel: Locator
  readonly descriptionLabel: Locator
  readonly cartItems: Locator
  readonly checkoutButton: Locator
  readonly continueShopping: Locator

  constructor(page: Page) {
    this.page = page
    this.cartList = page.locator('[data-test="cart-list"]')
    this.quantityLabel = page.locator('[data-test="cart-quantity-label"]')
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]')
    this.cartItems = page.locator('[data-test="inventory-item"]')
    this.checkoutButton = page.locator('[data-test="checkout"]')
    this.continueShopping = page.locator('[data-test="continue-shopping"]')
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart\.html/)
    await expect(this.cartList).toBeVisible()
    await expect(this.quantityLabel).toHaveText('QTY')
    await expect(this.descriptionLabel).toHaveText('Description')
  }

  // Cart item locators
  getCartItemByName(itemName: string): Locator {
    return this.cartItems.filter({ hasText: itemName })
  }

  getItemQuantityLocator(itemName: string): Locator {
    return this.getCartItemByName(itemName).locator('[data-test="item-quantity"]')
  }

  getItemNameLocator(itemName: string): Locator {
    return this.getCartItemByName(itemName).locator('[data-test="inventory-item-name"]')
  }

  getItemDescriptionLocator(itemName: string): Locator {
    return this.getCartItemByName(itemName).locator('[data-test="inventory-item-desc"]')
  }

  getItemPriceLocator(itemName: string): Locator {
    return this.getCartItemByName(itemName).locator('[data-test="inventory-item-price"]')
  }

  getRemoveButtonLocator(itemName: string): Locator {
    const itemSlug = itemName.toLowerCase().replace(/\s+/g, '-')
    return this.page.locator(`[data-test="remove-${itemSlug}"]`)
  }

  getItemLinkLocator(itemName: string): Locator {
    const item = this.getCartItemByName(itemName)
    return item.locator('[data-test^="item-"]').first() // Get the first link-like element
  }

  // Cart verification methods
  async verifyCartContents(
    expectedItems: Array<{
      name: string
      quantity?: number
      price?: number
      description?: string
    }>,
  ): Promise<void> {
    await expect(this.cartList).toBeVisible()
    const itemCount = await this.cartItems.count()
    expect(itemCount).toBe(expectedItems.length)
    for (const expectedItem of expectedItems) {
      await this.verifyCartItem(expectedItem)
    }
  }

  async verifyCartItem(expectedItem: {
    name: string
    quantity?: number
    price?: number
    description?: string
  }): Promise<void> {
    const itemLocator = this.getCartItemByName(expectedItem.name)
    await expect(itemLocator).toBeVisible()
    if (expectedItem.quantity !== undefined) {
      await expect(this.getItemQuantityLocator(expectedItem.name)).toHaveText(
        expectedItem.quantity.toString(),
      )
    }
    if (expectedItem.price !== undefined) {
      await expect(this.getItemPriceLocator(expectedItem.name)).toHaveText(
        '$' + expectedItem.price.toString(),
      )
    }
    if (expectedItem.description !== undefined) {
      await expect(this.getItemDescriptionLocator(expectedItem.name)).toHaveText(
        expectedItem.description,
      )
    }
  }

  // Item interaction methods
  async removeItemFromCart(itemName: string): Promise<void> {
    const removeButton = this.getRemoveButtonLocator(itemName)
    await expect(removeButton).toBeVisible()
    await expect(removeButton).toBeEnabled()
    await removeButton.click()
  }

  async clickOnItemName(itemName: string): Promise<void> {
    const itemLink = this.getItemLinkLocator(itemName)
    await itemLink.click()
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click()
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShopping.click()
  }

  async checkItemCount(items: number): Promise<void> {
    expect(await this.cartItems.count()).toBe(items)
  }
}
