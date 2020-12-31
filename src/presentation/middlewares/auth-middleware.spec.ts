import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from '../errors'

interface SutTypes {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}

describe('Auth Middleware', () => {
  test('Should return 403  if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })
})
