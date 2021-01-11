import {
  SaveSurveyResult,
  LoadSurveyById,
  Controller,
  HttpRequest,
  HttpResponse
} from './save-survey-result-controller-protocols'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = httpRequest
      const survey = await this.loadSurveyById.loadById(params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}
