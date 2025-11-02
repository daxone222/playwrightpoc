import { test } from '@playwright/test'
import { PageManager } from '../../../pages/PageManager'
import { Users } from '../../../test-data/Users'
import { Products } from '../../../test-data/Products'
import { Client } from '../../../test-data/Client'

test.describe('Order Tests', () => {
  let pageManager: PageManager

  test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page)
    await test.step(`Navigate to login page`, async () => {
      await pageManager.loginPage.navigateToLoginPage()
    })
  })

  test('Order journey for product BACKPACK starting from product page works accordingly', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Click on product : ${Products.BACKPACK}`, async () => {
      await pageManager.inventoryPage.clickProductByName(Products.BACKPACK.name)
    })
    await test.step(`Verify product page for :  ${Products.BACKPACK} has loaded correctly`, async () => {
      await pageManager.productPage.verifyProductPageDetails(
        Products.BACKPACK.name,
        Products.BACKPACK.description,
        Products.BACKPACK.price,
      )
    })
    await test.step(`Add product to cart and verify product page reflects changes`, async () => {
      await pageManager.productPage.addProductToCart()
      await pageManager.productPage.verifyProductAddedToCart()
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.productPage.goToShoppingCart()
      await pageManager.cartPage.verifyCartPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
      ])
    })
    await test.step(`Go to checkout and verify checkout step one page loaded accordingly`, async () => {
      await pageManager.cartPage.clickCheckout()
      await pageManager.checkoutStepOnePage.verifyPageLoaded()
    })
    await test.step(`Complete form and continue to checkout step two`, async () => {
      await pageManager.checkoutStepOnePage.fillCheckoutInformation(
        Client.person.firstName,
        Client.person.lastName,
        Client.person.postCode,
      )
      await pageManager.checkoutStepOnePage.clickContinue()
    })
    await test.step(`Verify checkout steo two loaded properly with correct item`, async () => {
      await pageManager.checkoutStepTwoPage.verifyPageLoaded()
      await pageManager.checkoutStepTwoPage.verifyCheckountContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
      ])
    })
    await test.step(`Verify payment, shipping and prince information is correct and finish order`, async () => {
      await pageManager.checkoutStepTwoPage.verifyPaymentAndShippingInfo()
      await pageManager.checkoutStepTwoPage.verifyPriceSection(
        Products.BACKPACK.price,
        Products.BACKPACK.tax,
        Products.BACKPACK.totalPrice,
      )
      await pageManager.checkoutStepTwoPage.clickFinish()
    })
    await test.step(`Verify order was done with success`, async () => {
      await pageManager.checkoutCompletePage.verifyPageLoaded()
      await pageManager.checkoutCompletePage.verifyPonyExpressImage()
      await pageManager.checkoutCompletePage.verifySuccessMessage()
      await pageManager.checkoutCompletePage.verifyBackToProductsButton()
    })
  })

  test('Order journey for product ONESIE starting from product page works accordingly', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Click on product : ${Products.ONESIE}`, async () => {
      await pageManager.inventoryPage.clickProductByName(Products.ONESIE.name)
    })
    await test.step(`Verify product page for :  ${Products.ONESIE} has loaded correctly`, async () => {
      await pageManager.productPage.verifyProductPageDetails(
        Products.ONESIE.name,
        Products.ONESIE.description,
        Products.ONESIE.price,
      )
    })
    await test.step(`Add product to cart and verify product page reflects changes`, async () => {
      await pageManager.productPage.addProductToCart()
      await pageManager.productPage.verifyProductAddedToCart()
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.productPage.goToShoppingCart()
      await pageManager.cartPage.verifyCartPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.ONESIE.name,
          quantity: 1,
          price: Products.ONESIE.price,
          description: Products.ONESIE.description,
        },
      ])
    })
    await test.step(`Go to checkout and verify checkout step one page loaded accordingly`, async () => {
      await pageManager.cartPage.clickCheckout()
      await pageManager.checkoutStepOnePage.verifyPageLoaded()
    })
    await test.step(`Complete form and continue to checkout step two`, async () => {
      await pageManager.checkoutStepOnePage.fillCheckoutInformation(
        Client.company.firstName,
        Client.company.lastName,
        Client.company.postCode,
      )
      await pageManager.checkoutStepOnePage.clickContinue()
    })
    await test.step(`Verify checkout steo two loaded properly with correct item`, async () => {
      await pageManager.checkoutStepTwoPage.verifyPageLoaded()
      await pageManager.checkoutStepTwoPage.verifyCheckountContents([
        {
          name: Products.ONESIE.name,
          quantity: 1,
          price: Products.ONESIE.price,
          description: Products.ONESIE.description,
        },
      ])
    })
    await test.step(`Verify payment, shipping and prince information is correct and finish order`, async () => {
      await pageManager.checkoutStepTwoPage.verifyPaymentAndShippingInfo()
      await pageManager.checkoutStepTwoPage.verifyPriceSection(
        Products.ONESIE.price,
        Products.ONESIE.tax,
        Products.ONESIE.totalPrice,
      )
      await pageManager.checkoutStepTwoPage.clickFinish()
    })
    await test.step(`Verify order was done with success`, async () => {
      await pageManager.checkoutCompletePage.verifyPageLoaded()
      await pageManager.checkoutCompletePage.verifyPonyExpressImage()
      await pageManager.checkoutCompletePage.verifySuccessMessage()
      await pageManager.checkoutCompletePage.verifyBackToProductsButton()
    })
  })
})

test.afterEach(async () => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`)
})
