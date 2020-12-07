import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => {
        resolve({ statusCode: 200, body: { any_param: 'any_response' } })
      })
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stackerror: string): Promise<void> {
      return await new Promise(resolve => {
        resolve()
      })
    }
  }
  return new LogErrorRepositoryStub()
}

interface SutTypes {
  sut: Controller
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle with correct values', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle({
      body: {
        any_param: 'any_value'
      }
    })

    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        any_param: 'any_value'
      }
    })
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      body: {
        any_param: 'any_value'
      }
    })

    expect(response).toEqual({
      statusCode: 200, body: { any_param: 'any_response' }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    await sut.handle({
      body: {
        any_param: 'any_value'
      }
    })

    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})
