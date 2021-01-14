import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image'
    }, {
      answer: 'other_answer'
    }
  ],
  date: new Date()
})

export const mockAddSurveyParams = (): AddSurveyParams => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }
}

export const mockSurveysModels = (): SurveyModel[] => ([{
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      image: 'any_image'
    }, {
      answer: 'other_answer'
    }
  ],
  date: new Date()
}, {
  id: 'other_id',
  question: 'other_question',
  answers: [
    {
      answer: 'other_answer_2'
    }
  ],
  date: new Date()
}])
