import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../presentation/helpers/Validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()

  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
