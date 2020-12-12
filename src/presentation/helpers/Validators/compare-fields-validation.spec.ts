import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('password', 'passwordConfirm')
  return {
    sut
  }
}

describe('CompareFields Validation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ password: '' })
    expect(error).toEqual(new InvalidParamError('passwordConfirm'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ password: '123', passwordConfirm: '123' })
    expect(error).toBeFalsy()
  })
})
