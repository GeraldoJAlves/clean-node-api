import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite
} from '../../../presentation/helpers/Validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()

  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirm'))
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
