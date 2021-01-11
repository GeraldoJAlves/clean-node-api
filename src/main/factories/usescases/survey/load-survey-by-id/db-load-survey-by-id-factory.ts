import { DbLoadSurveyById } from '@/data/usescases/survey/load-survey-by-id/db-load-survey-by-id'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyById = (): DbLoadSurveyById => {
  const loadSurveyByIdRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(loadSurveyByIdRepository)
}
