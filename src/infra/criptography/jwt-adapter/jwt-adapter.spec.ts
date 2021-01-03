import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (paylaod: string, secret: string): Promise<string> {
    return await Promise.resolve('any_token')
  },
  async verify (token: string, secret: string): Promise<string> {
    return 'any_value'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret_key')
}

const makeFakeHash = (): object => ({
  id: 'any_value'
})

describe('Jwt Adapter', () => {
  describe('verify()', () => {
    test('Should call jwt.verify with correct values', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify')
      const sut = makeSut()
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret_key')
    })

    test('Should return a value when jwt.verify succeds ', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })

    test('Should throw if jwt.verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('sign()', () => {
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
})
