import { SurveyAnswerModel } from '@/domain/models/survey'

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}
