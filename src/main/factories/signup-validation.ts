import { RequiredFieldValidation } from '../../presentation/helpers/Validators/required-field-validation'
import { Validation } from '../../presentation/helpers/Validators/validation'
import { ValidationComposite } from '../../presentation/helpers/Validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
