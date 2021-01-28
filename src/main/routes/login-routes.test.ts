import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  const uriMongo: string = process.env.MONGO_URL
  let accountCollection: Collection

  beforeAll(async () => {
    if (uriMongo) { await MongoHelper.connect(uriMongo) }
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup ', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirm: 'any_password'
        })
        .expect(200)
    })

    test('Should return 400 on signup ', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          name: 'any_name',
          password: 'any_password',
          passwordConfirm: 'any_password'
        })
        .expect(400)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login ', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      await request(app)
        .post('/api/v1/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(200)
    })

    test('Should return 401 with invalid credentials', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      await request(app)
        .post('/api/v1/login')
        .send({
          email: 'any_email@mail.com',
          password: 'wrong_password'
        })
        .expect(401)
    })
  })
})
