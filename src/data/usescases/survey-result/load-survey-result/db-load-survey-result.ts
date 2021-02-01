import { LoadSurveyResult, SurveyResultModel, LoadSurveyResultRepository } from './db-load-survey-result-protocols'

export class DbLoadSaveSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    return await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}
