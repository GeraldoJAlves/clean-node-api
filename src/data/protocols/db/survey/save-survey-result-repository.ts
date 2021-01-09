import { SurveyResultModel } from '@/domain/models/survey-result'
import { AddSurveyResultModel } from '@/domain/usecases/save-survey-result'

export interface SaveSurveyResultRepository {
  save: (data: AddSurveyResultModel) => Promise<SurveyResultModel>
}
