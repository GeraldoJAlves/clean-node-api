import { DbLoadSurveyResult } from '@/data/usescases/survey-result/load-survey-result/db-load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): DbLoadSurveyResult => {
  const loadSurveyResultRepository = new SurveyResultMongoRepository()
  const loadSurveyByIdRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(loadSurveyResultRepository, loadSurveyByIdRepository)
}
