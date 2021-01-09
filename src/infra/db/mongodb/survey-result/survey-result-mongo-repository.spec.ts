import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeFakeSurveyResultData = (): SurveyResultModel => ({
  id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

describe('SurveyResultMongoRepository', () => {
  const uriMongo: string = process.env.MONGO_URL ?? ''
  let surveyResultCollection: Collection

  beforeAll(async () => {
    if (uriMongo) { await MongoHelper.connect(uriMongo) }
  })

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('save()', () => {
    test('Should add a survey-result on success', async () => {
      const sut = makeSut()
      const data = makeFakeSurveyResultData()
      await sut.save(data)
      const survey = await surveyResultCollection.findOne({ surveyId: data.surveyId })
      expect(survey.answer).toBe(data.answer)
      expect(survey.accountId).toBe(data.accountId)
    })
  })
})
