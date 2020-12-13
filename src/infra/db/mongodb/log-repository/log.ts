import { LogErrorRepository } from '../../../../data/protocols/db/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stackError: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('errors')
    await accountCollection.insertOne({ stackError, date: new Date() })
  }
}
