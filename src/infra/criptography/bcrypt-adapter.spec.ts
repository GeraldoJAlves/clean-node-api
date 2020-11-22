import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(12)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = makeSut()

    await sut.encrypt('any_password')

    expect(hashSpy).toHaveBeenCalledWith('any_password', 12)
  })
})
