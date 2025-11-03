import { test } from '@playwright/test'
import { PageManager } from '../../../pages/PageManager'
import { Users } from '../../../test-data/Users'
import { Products } from '../../../test-data/Products'
import { Client } from '../../../test-data/Client'
import { CheckoutStepOneMessages } from '../../../test-data/Errors'

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
      await pageManager.productPage.verifyRemoveButton()
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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
      await pageManager.productPage.verifyRemoveButton()
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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

  test('Order journey for product BACKPACK starting from inventory page works accordingly', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.BACKPACK.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.BACKPACK.name)
    })
    await test.step(`Verify item has remove button and shopping notification badge updated to 1`, async () => {
      await pageManager.inventoryPage.verifyRemoveButtonFor(Products.BACKPACK.name)
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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

  test('Order journey for product ONESIE starting from inventory page works accordingly', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.ONESIE.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.ONESIE.name)
    })
    await test.step(`Verify item has remove button and shopping notification badge updated to 1`, async () => {
      await pageManager.inventoryPage.verifyRemoveButtonFor(Products.ONESIE.name)
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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

  test('Order journey for multiple products starting from inventory page works accordingly', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.BACKPACK.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.BACKPACK.name)
    })
    await test.step(`Add product: ${Products.ONESIE.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.ONESIE.name)
    })
    await test.step(`Verify items have remove button and shopping notification badge updated to 2`, async () => {
      await pageManager.inventoryPage.verifyRemoveButtonFor(Products.BACKPACK.name)
      await pageManager.inventoryPage.verifyRemoveButtonFor(Products.ONESIE.name)
      await pageManager.menuPage.verifyShoppingBadgeUpdated(2)
    })
    await test.step(`Go to shopping cart and verify correct items are in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
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
        Products.BACKPACK.price + Products.ONESIE.price,
        Products.BACKPACK.tax + Products.ONESIE.tax,
        Products.BACKPACK.totalPrice + Products.ONESIE.totalPrice,
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

  test('User can remove item from cart with success', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.BACKPACK.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.BACKPACK.name)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
      ])
    })
    await test.step(`Remove item from cart and verify cart is empty`, async () => {
      await pageManager.cartPage.removeItemFromCart(Products.BACKPACK.name)
      await pageManager.cartPage.checkItemCount(0)
    })
  })

  test('Cart updates accordingly after user removes one item from cart out of multiple items added', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.BACKPACK.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.BACKPACK.name)
    })
    await test.step(`Add product: ${Products.ONESIE.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.ONESIE.name)
    })
    await test.step(`Go to shopping cart and verify correct items are in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
        {
          name: Products.ONESIE.name,
          quantity: 1,
          price: Products.ONESIE.price,
          description: Products.ONESIE.description,
        },
      ])
    })
    await test.step(`Remove one item from the cart and check one item remains`, async () => {
      await pageManager.cartPage.removeItemFromCart(Products.BACKPACK.name)
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.ONESIE.name,
          quantity: 1,
          price: Products.ONESIE.price,
          description: Products.ONESIE.description,
        },
      ])
    })
  })

  test('Remove item on inventory page works accordingly', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.BACKPACK.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.BACKPACK.name)
    })
    await test.step(`Add product: ${Products.ONESIE.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.ONESIE.name)
    })
    await test.step(`Remove product: ${Products.BACKPACK.name} on inventory page`, async () => {
      await pageManager.inventoryPage.removeProduct(Products.BACKPACK.name)
    })
    await test.step(`Go to shopping cart and verify correct items are in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.ONESIE.name,
          quantity: 1,
          price: Products.ONESIE.price,
          description: Products.ONESIE.description,
        },
      ])
    })
  })

  test('User can add multiple items after returning from cart using continue shopping and finish order with success', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Add product: ${Products.BACKPACK.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.BACKPACK.name)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
      ])
    })
    await test.step(`Go back to inventory using the continue shopping button`, async () => {
      await pageManager.cartPage.clickContinueShopping()
      await pageManager.inventoryPage.expectToBeOnInventoryPage()
    })
    await test.step(`Add product: ${Products.ONESIE.name} to cart`, async () => {
      await pageManager.inventoryPage.addProductToCart(Products.ONESIE.name)
    })
    await test.step(`Verify items have remove button and shopping notification badge updated to 2`, async () => {
      await pageManager.inventoryPage.verifyRemoveButtonFor(Products.BACKPACK.name)
      await pageManager.inventoryPage.verifyRemoveButtonFor(Products.ONESIE.name)
      await pageManager.menuPage.verifyShoppingBadgeUpdated(2)
    })
    await test.step(`Go to shopping cart and verify correct items are in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
      await pageManager.cartPage.verifyCartContents([
        {
          name: Products.BACKPACK.name,
          quantity: 1,
          price: Products.BACKPACK.price,
          description: Products.BACKPACK.description,
        },
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
        Products.BACKPACK.price + Products.ONESIE.price,
        Products.BACKPACK.tax + Products.ONESIE.tax,
        Products.BACKPACK.totalPrice + Products.ONESIE.totalPrice,
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

  test('Verify user can finish order after solving all validation errors on checkout step one', async () => {
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
      await pageManager.productPage.verifyRemoveButton()
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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
    await test.step(`Verify First Name required error appears`, async () => {
      await pageManager.checkoutStepOnePage.clickContinue()
      await pageManager.checkoutStepOnePage.verifyErrorMessage(
        CheckoutStepOneMessages.FIRST_NAME_REQUIRED,
      )
    })
    await test.step(`Verify Last Name required error appears`, async () => {
      await pageManager.checkoutStepOnePage.fillFirstName(Client.person.firstName)
      await pageManager.checkoutStepOnePage.clickContinue()
      await pageManager.checkoutStepOnePage.verifyErrorMessage(
        CheckoutStepOneMessages.LAST_NAME_REQUIRED,
      )
    })
    await test.step(`Verify Post Code required error appears`, async () => {
      await pageManager.checkoutStepOnePage.fillLastName(Client.person.lastName)
      await pageManager.checkoutStepOnePage.clickContinue()
      await pageManager.checkoutStepOnePage.verifyErrorMessage(
        CheckoutStepOneMessages.POST_CODE_REQUIRED,
      )
    })
    await test.step(`Add Post Code and click on continue`, async () => {
      await pageManager.checkoutStepOnePage.fillPostCode(Client.person.postCode)
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

  test('User canceling order after reaching checkout step one works accordingly', async () => {
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
      await pageManager.productPage.verifyRemoveButton()
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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
    await test.step(`Click on cancel`, async () => {
      await pageManager.checkoutStepOnePage.clickCancel()
    })
    await test.step(`Verify user redirected to cart page`, async () => {
      await pageManager.cartPage.verifyPageLoaded()
    })
  })

  test('User canceling order after reaching checkout step two works accordingly', async () => {
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
      await pageManager.productPage.verifyRemoveButton()
      await pageManager.menuPage.verifyShoppingBadgeUpdated(1)
    })
    await test.step(`Go to shopping cart and verify correct item is in the cart`, async () => {
      await pageManager.menuPage.goToShoppingCart()
      await pageManager.cartPage.verifyPageLoaded()
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
    await test.step(`Verify checkout steo two loaded properly and click on cancel`, async () => {
      await pageManager.checkoutStepTwoPage.verifyPageLoaded()
      await pageManager.checkoutStepTwoPage.clickCancel()
    })
    await test.step(`Verify user redirected to inventory page`, async () => {
      await pageManager.inventoryPage.expectToBeOnInventoryPage()
    })
  })
})

test.afterEach(async () => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`)
})
