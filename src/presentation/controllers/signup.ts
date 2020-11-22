import { HttpRequest, HttpResponse } from '../protocols/http'
import { EmailValidator } from '../protocols/email-validator'
import { Controller } from '../protocols/controller'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return {
        statusCode: 201,
        body: null
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
