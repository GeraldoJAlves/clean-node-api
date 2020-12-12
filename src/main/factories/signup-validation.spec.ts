import { Validation } from '../../presentation/controllers/signup/signup-protocols'
import { CompareFieldsValidation } from '../../presentation/helpers/Validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/Validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/Validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/Validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('Shoul call ValidationComposite with all validations', async () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirm'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
