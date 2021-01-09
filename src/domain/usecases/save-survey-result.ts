import { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResult {
  save: (data: AddSurveyResultModel) => Promise<SurveyResultModel>
}

export type AddSurveyResultModel = Omit<SurveyResultModel, 'id'>
