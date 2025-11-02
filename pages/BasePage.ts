import { Page, Locator } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url)
  }

  async getTitle(): Promise<string> {
    return await this.page.title()
  }

  async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds)
  }
}
