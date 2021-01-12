import { SurveyModel } from '@/domain/models/survey'

export interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}

export type AddSurveyParams = Omit<SurveyModel, 'id'>
