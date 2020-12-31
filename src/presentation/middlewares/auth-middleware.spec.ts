import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError, HttpRequest, LoadAccountByToken, AccountModel } from './auth-middleware-protocols'

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_hash'
      })
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'valid_token'
  }
})

describe('Auth Middleware', () => {
  test('Should return 403  if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('valid_token')
  })
})
