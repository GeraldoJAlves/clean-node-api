import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return await Promise.resolve('hashed_value')
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt.hash with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = makeSut()
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on bcrypt.hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if bcrypt.hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call bcrypt.compare with correct values', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    const sut = makeSut()
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when bcrypt.compare succeeds', async () => {
    const sut = makeSut()
    const isEqual = await sut.compare('any_value', 'any_hash')
    expect(isEqual).toBeTruthy()
  })

  test('Should return false when bcrypt.compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const isEqual = await sut.compare('any_value', 'any_hash')
    expect(isEqual).toBe(false)
  })

  test('Should throw if bcrypt.compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
