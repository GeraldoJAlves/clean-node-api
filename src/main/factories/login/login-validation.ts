import {
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite
} from '../../../presentation/helpers/Validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()

  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
