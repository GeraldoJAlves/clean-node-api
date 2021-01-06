import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

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

const makeFakeDataSurvey = (): any => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, {
    answer: 'other_answer'
  }]
})

describe('Surveys Routes', () => {
  const uriMongo: string = process.env.MONGO_URL

  beforeAll(async () => {
    if (uriMongo) { await MongoHelper.connect(uriMongo) }
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/v1/surveys')
        .send({
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }, {
            answer: 'other_answer'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken('admin')
      await request(app)
        .post('/api/v1/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeDataSurvey())
        .expect(204)
    })

    test('Should return 403 on add survey with invalid accessToken', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/v1/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeDataSurvey())
        .expect(403)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/v1/surveys')
        .expect(403)
    })

    test('Should return 204 on load empty list with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .get('/api/v1/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })

      await request(app)
        .get('/api/v1/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
