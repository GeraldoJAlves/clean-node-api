import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const { accountId, surveyId, answer, date } = data
    const { value } = await surveyResultCollection.findOneAndUpdate({
      surveyId,
      accountId
    }, {
      $set: {
        answer,
        date,
        surveyId,
        accountId
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return MongoHelper.map(value)
  }
}
