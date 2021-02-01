import { LoadSurveyResult, SurveyResultModel, LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'

export class DbLoadSaveSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const { id, question, date, answers } = await this.loadSurveyByIdRepository.loadById(surveyId)
      return {
        surveyId: id,
        question,
        date,
        answers: answers.map((answer) => Object.assign({}, answer, { percent: 0, count: 0 }))
      }
    }
    return surveyResult
  }
}
