import { throwError } from '@/domain/test'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from './auth-middleware-protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByTokenSpy } from '../test'
import faker from 'faker'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': faker.random.uuid()
  }
})

describe('Auth Middleware', () => {
  test('Should return 403  if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = faker.random.word()
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.headers['x-access-token'])
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.accountModel = null
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpRequest = mockRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok({
      accountId: loadAccountByTokenSpy.accountModel.id
    }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
