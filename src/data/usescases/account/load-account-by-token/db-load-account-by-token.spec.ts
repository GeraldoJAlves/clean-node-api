import { DbLoadAccountByToken } from './db-load-account-by-token'
import { throwError } from '@/domain/test'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
  decrypterSpy: DecrypterSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    loadAccountByTokenRepositorySpy,
    decrypterSpy
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken usecases', () => {
  beforeEach(() => {
    token = faker.random.uuid()
    role = faker.random.word()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load(token, role)
    expect(loadAccountByTokenRepositorySpy.accessToken).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load(token)
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token)
    await expect(promise).rejects.toThrow()
  })

  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load(token)
    expect(account).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load(token)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })
})
