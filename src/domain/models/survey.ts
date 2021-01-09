export type SurveyModel = {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export type SurveyAnswerModel = {
  answer: string
  image?: string | null
}
