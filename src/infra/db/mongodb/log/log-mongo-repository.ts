import { LogErrorRepository } from '@/data/protocols/db/log'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
export class LogMongoRepository implements LogErrorRepository {
  async logError (stackError: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({ stackError, date: new Date() })
  }
}
