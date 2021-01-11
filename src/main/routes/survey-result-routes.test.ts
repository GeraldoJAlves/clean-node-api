import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeAccessToken = async (role?: string): Promise<string> => {
  const { ops: [{ _id: id }] } = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: '123',
    role
  })

  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

const makeFakeSurvey = (): any => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, {
    answer: 'other_answer'
  }],
  date: new Date()
})

describe('SurveyResults Routes', () => {
  const uriMongo: string = process.env.MONGO_URL

  beforeAll(async () => {
    if (uriMongo) { await MongoHelper.connect(uriMongo) }
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('survey-results')
    await surveyResultCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /surveys/{survey_id}/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/v1/surveys/any_survey_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne(makeFakeSurvey())
      const id: string = res.ops[0]._id
      await request(app)
        .put(`/api/v1/surveys/${id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })
})
