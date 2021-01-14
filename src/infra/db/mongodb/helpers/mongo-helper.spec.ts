import { MongoHelper as sut } from './mongo-helper'

const uriMongo = process.env.MONGO_URL

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(uriMongo)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Shoud reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
