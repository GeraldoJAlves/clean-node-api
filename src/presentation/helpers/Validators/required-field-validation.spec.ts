import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('name')
  return {
    sut
  }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validate fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any: 'value' })
    expect(error).toEqual(new MissingParamError('name'))
  })
})
