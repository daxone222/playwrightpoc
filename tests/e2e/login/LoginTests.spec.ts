import { test } from '@playwright/test'
import { PageManager } from '../../../pages/PageManager'
import { LoginErrorMessages, Users } from '../../../test-data/Users'

test.describe('Login Tests', () => {
  let pageManager: PageManager

  test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page)
    await test.step(`Navigate to login page`, async () => {
      await pageManager.loginPage.navigateToLoginPage()
    })
  })

  test('Login with standard username and password with success', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.standard.password)
    })
    await test.step(`Check user landed with success on inventory page`, async () => {
      await pageManager.inventoryPage.expectToBeOnInventoryPage()
    })
  })

  test('Login with locked user triggers correct login error', async () => {
    await test.step(`Login with username : ${Users.locked.username} and password: ${Users.locked.password}`, async () => {
      await pageManager.loginPage.login(Users.locked.username, Users.locked.password)
    })
    await test.step(`Check user receives error : ${LoginErrorMessages.LOCKED_OUT}`, async () => {
      await pageManager.loginPage.expectErrorMessageToContain(LoginErrorMessages.LOCKED_OUT)
    })
  })

  test('Login with invalid username triggers correct login error', async () => {
    await test.step(`Login with username : ${Users.invalidUsername.username} and password: ${Users.invalidUsername.password}`, async () => {
      await pageManager.loginPage.login(
        Users.invalidUsername.username,
        Users.invalidUsername.password,
      )
    })
    await test.step(`Check user receives error : ${LoginErrorMessages.INVALID_CREDENTIALS}`, async () => {
      await pageManager.loginPage.expectErrorMessageToContain(
        LoginErrorMessages.INVALID_CREDENTIALS,
      )
    })
  })

  test('Login with invalid password for existing user triggers correct login error', async () => {
    await test.step(`Login with username : ${Users.invalidPassword.username} and password: ${Users.invalidPassword.password}`, async () => {
      await pageManager.loginPage.login(
        Users.invalidPassword.username,
        Users.invalidPassword.password,
      )
    })
    await test.step(`Check user receives error : ${LoginErrorMessages.INVALID_CREDENTIALS}`, async () => {
      await pageManager.loginPage.expectErrorMessageToContain(
        LoginErrorMessages.INVALID_CREDENTIALS,
      )
    })
  })

  test('Login with empty username triggers correct login error', async () => {
    await test.step(`Login with username : ${Users.emptyCredentials.username} and password: ${Users.standard.password}`, async () => {
      await pageManager.loginPage.login(Users.emptyCredentials.username, Users.standard.password)
    })
    await test.step(`Check user receives error : ${LoginErrorMessages.USERNAME_REQUIRED}`, async () => {
      await pageManager.loginPage.expectErrorMessageToContain(LoginErrorMessages.USERNAME_REQUIRED)
    })
  })

  test('Login with empty password triggers correct login error', async () => {
    await test.step(`Login with username : ${Users.standard.username} and password: ${Users.emptyCredentials.password}`, async () => {
      await pageManager.loginPage.login(Users.standard.username, Users.emptyCredentials.password)
    })
    await test.step(`Check user receives error : ${LoginErrorMessages.USERNAME_REQUIRED}`, async () => {
      await pageManager.loginPage.expectErrorMessageToContain(LoginErrorMessages.PASSWORD_REQUIRED)
    })
  })
})

test.afterEach(async () => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`)
})
