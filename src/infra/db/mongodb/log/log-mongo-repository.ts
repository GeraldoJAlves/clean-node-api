import { LogErrorRepository } from '@/data/protocols/db/log'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
export class LogMongoRepository implements LogErrorRepository {
  async logError (stackError: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('errors')
    await accountCollection.insertOne({ stackError, date: new Date() })
  }
}
