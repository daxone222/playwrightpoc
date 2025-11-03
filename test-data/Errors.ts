export const LoginErrorMessages = {
  USERNAME_REQUIRED: 'Epic sadface: Username is required',
  PASSWORD_REQUIRED: 'Epic sadface: Password is required',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
} as const

export const CheckoutStepOneMessages = {
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POST_CODE_REQUIRED: 'Error: Postal Code is required',
} as const
