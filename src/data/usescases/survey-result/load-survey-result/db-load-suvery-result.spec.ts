import { DbLoadSaveSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey-result'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test'

type SutType = {
  sut: DbLoadSaveSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutType => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSaveSurveyResult(loadSurveyResultRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult usecases', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyResultRepository with correct SurveyId', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load('any_survey_id')
    await expect(promise).rejects.toThrow()
  })
})