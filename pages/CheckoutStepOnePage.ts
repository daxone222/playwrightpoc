import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutStepOnePage extends BasePage {
  // Locators
  readonly headerTitle: Locator
  readonly checkoutInfoContainer: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly postalCodeInput: Locator
  readonly errorMessageContainer: Locator
  readonly cancelButton: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    super(page)
    this.headerTitle = page.locator('[data-test="title"]')
    this.checkoutInfoContainer = page.locator('[data-test="checkout-info-container"]')
    this.firstNameInput = page.locator('[data-test="firstName"]')
    this.lastNameInput = page.locator('[data-test="lastName"]')
    this.postalCodeInput = page.locator('[data-test="postalCode"]')
    this.errorMessageContainer = page.locator('.error-message-container')
    this.cancelButton = page.locator('[data-test="cancel"]')
    this.continueButton = page.locator('[data-test="continue"]')
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/)
    await expect(this.headerTitle).toHaveText('Checkout: Your Information')
    await expect(this.checkoutInfoContainer).toBeVisible()
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.continueButton).toBeVisible()
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click()
  }
}
