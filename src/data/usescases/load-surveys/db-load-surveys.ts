import { LoadSurveys, LoadSurveysRepository, SurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) { }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.load()
    return null
  }
}
