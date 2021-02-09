import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModels } from '@/domain/test'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyId: string
  surveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.surveyId = id
    return await Promise.resolve(this.surveyModel)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  callsCount = 0
  surveysModel = mockSurveysModels()
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return await Promise.resolve(this.surveysModel)
  }
}
