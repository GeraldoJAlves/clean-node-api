import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirm } = httpRequest.body
      if (password !== passwordConfirm) {
        return badRequest(new InvalidParamError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({ name, email, password })

      return {
        statusCode: 201,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}
