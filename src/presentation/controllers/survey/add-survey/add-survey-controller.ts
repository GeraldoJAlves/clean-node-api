import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  AddSurvey
} from './add-survey-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const error = this.validation.validate(body)
    if (error) {
      return badRequest(error)
    }
    await this.addSurvey.add(body)
    return null
  }
}
