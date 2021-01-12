import { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResult {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>
