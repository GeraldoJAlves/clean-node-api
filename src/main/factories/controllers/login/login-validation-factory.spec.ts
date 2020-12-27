import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../presentation/helpers/Validators'
import { EmailValidator } from '../../../../presentation/protocols/email-validator'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../presentation/helpers/Validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Shoul call ValidationComposite with all validations', async () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
