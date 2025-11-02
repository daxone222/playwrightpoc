import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { InventoryPage } from './InventoryPage'
import { ProductPage } from './ProductPage'
import { CartPage } from './CartPage'
import { CheckoutStepOnePage } from './CheckoutStepOnePage'
import { CheckoutStepTwoPage } from './CheckoutStepTwoPage'
import { CheckoutCompletePage } from './CheckoutCompletePage'

export class PageManager {
  readonly page: Page
  readonly loginPage: LoginPage
  readonly inventoryPage: InventoryPage
  readonly productPage: ProductPage
  readonly cartPage: CartPage
  readonly checkoutStepOnePage: CheckoutStepOnePage
  readonly checkoutStepTwoPage: CheckoutStepTwoPage
  readonly checkoutCompletePage: CheckoutCompletePage

  constructor(page: Page) {
    this.page = page
    this.loginPage = new LoginPage(page)
    this.inventoryPage = new InventoryPage(page)
    this.productPage = new ProductPage(page)
    this.cartPage = new CartPage(page)
    this.checkoutStepOnePage = new CheckoutStepOnePage(page)
    this.checkoutStepTwoPage = new CheckoutStepTwoPage(page)
    this.checkoutCompletePage = new CheckoutCompletePage(page)
  }
}
