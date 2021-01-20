import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validator'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('@/validation/validator/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Shoul call ValidationComposite with all validations', async () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('answers'))
    validations.push(new RequiredFieldValidation('question'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
