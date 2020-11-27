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

interface SutTypes {
  sut: Controller
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
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
})
