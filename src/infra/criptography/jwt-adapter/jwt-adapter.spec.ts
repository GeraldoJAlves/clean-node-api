import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (paylaod: string, secret: string): Promise<string> {
    return await Promise.resolve('any_token')
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

  test('Should return a token when jwt.sign succeds ', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt(makeFakeHash())
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if jwt.sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt(makeFakeHash())
    await expect(promise).rejects.toThrow()
  })
})
