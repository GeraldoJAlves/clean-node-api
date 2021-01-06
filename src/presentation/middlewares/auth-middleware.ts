import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, LoadAccountByToken, Middleware } from './auth-middleware-protocols'
import { AccessDeniedError } from '@/presentation/errors'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers || !httpRequest.headers['x-access-token']) {
        return forbidden(new AccessDeniedError())
      }
      const account = await this.loadAccountByToken.load(httpRequest.headers['x-access-token'], this.role)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }
      return ok({ accountId: account.id })
    } catch (err) {
      return serverError(err)
    }
  }
}
