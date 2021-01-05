import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeSut = (): SurveyMongoRepository => {
  const sut = new SurveyMongoRepository()
  return sut
}

const makeFakeSurveyData = (): AddSurveyModel => {
  return {
    question: 'any_question',
    answers: [{
      answer: 'any_answer',
      image: 'any_image'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }
}

describe('SurveyMongoRepository', () => {
  const uriMongo: string = process.env.MONGO_URL ?? ''
  let surveyCollection: Collection

  beforeAll(async () => {
    if (uriMongo) { await MongoHelper.connect(uriMongo) }
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      const data = makeFakeSurveyData()
      await sut.add(data)
      const account = await surveyCollection.findOne({ question: data.question })
      expect(account.question).toBe(data.question)
      expect(account.answers).toEqual(data.answers)
    })
  })
})
