import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { InventoryPage } from './InventoryPage'

export class PageManager {
  readonly page: Page
  readonly loginPage: LoginPage
  readonly inventoryPage: InventoryPage

  constructor(page: Page) {
    this.page = page
    this.loginPage = new LoginPage(page)
    this.inventoryPage = new InventoryPage(page)
  }
}
