import { Collection } from 'mongodb'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
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

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([{
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'any_image'
        }],
        date: new Date()
      }, {
        question: 'other_question',
        answers: [{
          answer: 'other_answer',
          image: 'other_image'
        }],
        date: new Date()
      }])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const surveyData = {
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'any_image'
        }],
        date: new Date()
      }
      const { ops: [surveyMongo] } = await surveyCollection.insertOne(surveyData)
      const sut = makeSut()
      const survey = await sut.loadById(surveyMongo._id)
      expect(survey).toEqual(MongoHelper.map(surveyMongo))
    })
  })

  test('Should return null', async () => {
    const sut = makeSut()
    const survey = await sut.loadById('5ffbd0f862bd34004691c4f8')
    expect(survey).toBeNull()
  })
})
