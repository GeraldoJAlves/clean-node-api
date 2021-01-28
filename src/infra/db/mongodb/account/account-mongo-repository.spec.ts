import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { AccountMongoRepository } from './account-mongo-repository'
import { mockAddAccountParams } from '@/domain/test'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
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

  describe('add()', () => {
    test('Should return an account on add succeeds', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const account = await sut.add(data)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(data.name)
      expect(account.email).toBe(data.email)
      expect(account.password).toBe(data.password)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadAccountByEmail succeeds', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await accountCollection.insertOne(data)
      const account = await sut.loadByEmail(data.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(data.name)
      expect(account.email).toBe(data.email)
      expect(account.password).toBe(data.password)
    })

    test('Should return nul on loadAccountByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      const { ops: [{ _id, accessToken }] } = await accountCollection.insertOne(data)
      expect(accessToken).toBeFalsy()
      await sut.updateAccessToken(_id, 'any_token')
      const account = await accountCollection.findOne({ _id })
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadAccountByToken()', () => {
    test('Should return an account on loadAccountByToken without role', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({}, data, { accessToken: 'any_token' }))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(data.name)
      expect(account.email).toBe(data.email)
      expect(account.password).toBe(data.password)
    })

    test('Should return an account on loadAccountByToken with admin role', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({}, data, { accessToken: 'any_token', role: 'admin' }))
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(data.name)
      expect(account.email).toBe(data.email)
      expect(account.password).toBe(data.password)
    })

    test('Should return null on loadAccountByToken with invalid role', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({}, data, { accessToken: 'any_token' }))
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeNull()
    })

    test('Should return an account on loadAccountByToken if user is admin', async () => {
      const sut = makeSut()
      const data = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({}, data, { accessToken: 'any_token', role: 'admin' }))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(data.name)
      expect(account.email).toBe(data.email)
      expect(account.password).toBe(data.password)
    })

    test('Should return nul on loadAccountByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeNull()
    })
  })
})
