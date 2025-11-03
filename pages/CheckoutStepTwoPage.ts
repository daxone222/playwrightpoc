import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

interface OrderItem {
  name: string
  quantity: number
  price: string
  description: string
}

export class CheckoutStepTwoPage extends BasePage {
  // Page elements
  readonly cartList: Locator
  readonly quantityLabel: Locator
  readonly descriptionLabel: Locator
  readonly cartItems: Locator
  readonly subtotalLabel: Locator
  readonly taxLabel: Locator
  readonly totalLabel: Locator
  readonly finishButton: Locator
  readonly cancelButton: Locator
  readonly paymentInformation: Locator
  readonly paymentInfoValue: Locator
  readonly shippingInformation: Locator
  readonly shippingInfoValue: Locator

  constructor(page: Page) {
    super(page)
    this.cartList = page.locator('[data-test="cart-list"]')
    this.quantityLabel = page.locator('[data-test="cart-quantity-label"]')
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]')
    this.cartItems = page.locator('[data-test="inventory-item"]')
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]')
    this.taxLabel = page.locator('[data-test="tax-label"]')
    this.totalLabel = page.locator('[data-test="total-label"]')
    this.finishButton = page.locator('[data-test="finish"]')
    this.cancelButton = page.locator('[data-test="cancel"]')
    this.paymentInformation = page.locator('[data-test="payment-info-label"]')
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]')
    this.shippingInformation = page.locator('[data-test="shipping-info-label"]')
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]')
  }

  // Page verification
  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/)
    await expect(this.cartList).toBeVisible()
    await expect(this.quantityLabel).toHaveText('QTY')
    await expect(this.descriptionLabel).toHaveText('Description')
    await expect(this.finishButton).toBeVisible()
  }

  // Checkout overview verification methods
  async verifyCheckountContents(
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
      await this.verifyCheckoutItem(expectedItem)
    }
  }

  async verifyCheckoutItem(expectedItem: {
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

  // Checkout overview item locators
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

  // Action methods
  async clickFinish(): Promise<void> {
    await this.finishButton.click()
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click()
  }

  //verification methods
  async verifyPaymentAndShippingInfo(): Promise<void> {
    await expect(this.paymentInformation).toBeVisible()
    await expect(this.paymentInfoValue).toHaveText('SauceCard #31337')
    await expect(this.shippingInformation).toBeVisible()
    await expect(this.shippingInfoValue).toHaveText('Free Pony Express Delivery!')
  }

  async verifyPriceSection(subTotal: number, tax: number, total: number): Promise<void> {
    await expect(this.subtotalLabel).toHaveText(`Item total: $${subTotal}`)
    await expect(this.taxLabel).toHaveText(`Tax: $${tax.toFixed(2)}`)
    await expect(this.totalLabel).toHaveText(`Total: $${total}`)
  }
}
