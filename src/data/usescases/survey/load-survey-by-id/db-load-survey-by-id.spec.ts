import { DbLoadSurveyById } from './db-load-survey-by-id'
import { throwError } from '@/domain/test'
import { LoadSurveyByIdRepositorySpy } from '@/data/test'
import faker from 'faker'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbLoadSurveyById usecases', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.random.uuid()
  })

  test('Should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadById(surveyId)
    expect(loadSurveyByIdRepositorySpy.surveyId).toBe(surveyId)
  })

  test('Should throw if LoadSurveyByIdRepository throw', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(surveyId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    const survey = await sut.loadById(surveyId)
    await expect(survey).toEqual(loadSurveyByIdRepositorySpy.surveyModel)
  })
})
