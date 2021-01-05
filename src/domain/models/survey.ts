export interface SurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface SurveyAnswer {
  answer: string
  image?: string | null
}
