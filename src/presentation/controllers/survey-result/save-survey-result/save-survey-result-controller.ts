import {
  SaveSurveyResult,
  LoadSurveyById,
  Controller,
  HttpRequest,
  HttpResponse
} from './save-survey-result-controller-protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'

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
        return badRequest(new Error('surveyId not found'))
      }
      return noContent()
    } catch (err) {
      serverError(err)
    }
  }
}
