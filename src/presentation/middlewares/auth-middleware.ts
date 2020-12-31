import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError, HttpRequest, HttpResponse, LoadAccountByToken, Middleware } from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!!httpRequest.headers && httpRequest.headers['x-access-token']) {
      await this.loadAccountByToken.load(httpRequest.headers['x-access-token'])
    }
    return forbidden(new AccessDeniedError())
  }
}
