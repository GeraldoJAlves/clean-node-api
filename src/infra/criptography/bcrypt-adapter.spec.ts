import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}))

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

  test('Should return hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_password')

    expect(hash).toBe('hashed_value')
  })
})
