import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }, {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }
  ],
  date: faker.date.recent()
})

export const mockAddSurveyParams = (): AddSurveyParams => {
  return {
    question: faker.random.words(),
    answers: [{
      image: faker.image.imageUrl(),
      answer: faker.random.word()
    }, {
      answer: faker.random.word()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveysModels = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel()
])
