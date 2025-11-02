import { faker } from '@faker-js/faker'

export const Client = {
  person: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode('#####'),
  },
  company: {
    firstName: faker.company.name(),
    lastName: 'SRL',
    postCode: faker.location.zipCode('#####'),
  },
} as const
