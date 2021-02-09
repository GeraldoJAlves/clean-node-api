import { LoadSurveyResultController } from './load-survey-result-controller'
import { HttpRequest } from './load-survey-result-controller-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyByIdSpy, LoadSurveyResultSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyResultSpy: LoadSurveyResultSpy
  loadSurveyByIdSpy: LoadSurveyByIdSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const sut = new LoadSurveyResultController(loadSurveyResultSpy, loadSurveyByIdSpy)
  return {
    sut,
    loadSurveyResultSpy,
    loadSurveyByIdSpy
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: faker.random.uuid()
  }
})

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct id', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveyByIdSpy.id).toBe(httpRequest.params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    loadSurveyByIdSpy.surveyModel = null
    const httpRequest = mockRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct id', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveyResultSpy.surveyId).toBe(httpRequest.params.surveyId)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const httpRequest = mockRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(loadSurveyResultSpy.surveyResultModel))
  })
})
