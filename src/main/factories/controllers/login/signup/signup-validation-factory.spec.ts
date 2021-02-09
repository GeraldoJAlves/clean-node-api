import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('@/validation/validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('Shoul call ValidationComposite with all validations', async () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirm'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
