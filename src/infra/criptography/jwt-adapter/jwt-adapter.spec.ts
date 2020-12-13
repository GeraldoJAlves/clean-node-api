import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (paylaod: string, secret: string): Promise<string> {
    return await Promise.resolve('any_hash')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret_key')
}

const makeFakeHash = (): object => ({
  id: 'any_value'
})

describe('Jwt Adapter', () => {
  test('Should call jwt.sign with correct values', async () => {
    const hashSpy = jest.spyOn(jwt, 'sign')
    const sut = makeSut()
    await sut.encrypt(makeFakeHash())
    expect(hashSpy).toHaveBeenCalledWith(makeFakeHash(), 'secret_key')
  })
})
