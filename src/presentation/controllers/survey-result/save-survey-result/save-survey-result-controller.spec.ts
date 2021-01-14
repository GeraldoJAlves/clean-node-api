import { mockSurveyResultModel, throwError } from '@/domain/test'
import {
  SaveSurveyResult,
  LoadSurveyById,
  HttpRequest
} from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import MockDate from 'mockdate'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test'

type SutTypes = {
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = mockSaveSurveyResult()
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return {
    sut,
    saveSurveyResultStub,
    loadSurveyByIdStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
})

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const request = mockRequest()
    await sut.handle(request)
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.body = {
      answer: 'invalid_answer'
    }
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const request = mockRequest()
    await sut.handle(request)
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: request.params.surveyId,
      accountId: request.accountId,
      answer: request.body.answer,
      date: new Date()
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 403 if answer is not provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(mockSurveyResultModel()))
  })
})
