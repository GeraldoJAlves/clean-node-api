import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('answers'))
  validations.push(new RequiredFieldValidation('question'))

  return new ValidationComposite(validations)
}
