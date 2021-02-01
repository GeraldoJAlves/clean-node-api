import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-respository'
import { LoadSurveyResult, SurveyResultModel } from './db-load-survey-result-protocols'

export class DbLoadSaveSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    return await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}
