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
      const { surveyId } = httpRequest.params
      const answer = httpRequest.body?.answer
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      if (!answer || !survey.answers.filter(data => data.answer === answer).length) {
        return forbidden(new InvalidParamError('answer'))
      }
      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}
