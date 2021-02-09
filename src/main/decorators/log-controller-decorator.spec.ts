import { LogErrorRepositorySpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { created, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, HttpRequest } from '@/presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import faker from 'faker'

class ControllerSpy implements Controller {
  httpRequest: HttpRequest
  httpResponse = created(mockAccountModel())

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(this.httpResponse)
  }
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirm: password
    }
  }
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = faker.random.word()
  return serverError(fakeError)
}

type SutTypes = {
  sut: Controller
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle with correct values', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = makeFakeServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stackerror).toBe(serverError.body.stack)
  })
})
