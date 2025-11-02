import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutCompletePage extends BasePage {
  // Locators
  readonly headerContainer: Locator
  readonly headerTitle: Locator
  readonly shoppingCartLink: Locator
  readonly shoppingCartBadge: Locator
  readonly checkoutCompleteContainer: Locator
  readonly ponyExpressImage: Locator
  readonly completeHeader: Locator
  readonly completeText: Locator
  readonly backToProductsButton: Locator

  constructor(page: Page) {
    super(page)
    this.headerContainer = page.locator('[data-test="header-container"]')
    this.headerTitle = page.locator('[data-test="title"]')
    this.checkoutCompleteContainer = page.locator('[data-test="checkout-complete-container"]')
    this.ponyExpressImage = page.locator('[data-test="pony-express"]')
    this.completeHeader = page.locator('[data-test="complete-header"]')
    this.completeText = page.locator('[data-test="complete-text"]')
    this.backToProductsButton = page.locator('[data-test="back-to-products"]')
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/)
    await expect(this.headerContainer).toBeVisible()
    await expect(this.headerTitle).toHaveText('Checkout: Complete!')
    await expect(this.checkoutCompleteContainer).toBeVisible()
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!')
    await expect(this.completeText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    )
  }

  async verifyPonyExpressImage(): Promise<void> {
    await expect(this.ponyExpressImage).toBeVisible()
    await expect(this.ponyExpressImage).toHaveAttribute('alt', 'Pony Express')
  }

  async verifyBackToProductsButton(): Promise<void> {
    await expect(this.backToProductsButton).toBeVisible()
    await expect(this.backToProductsButton).toBeEnabled()
    await expect(this.backToProductsButton).toHaveText('Back Home')
  }
}
