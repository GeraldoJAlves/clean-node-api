import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { LoginController } from './login'

const makeSut = (): LoginController => {
  return new LoginController()
}

// const makeFakeRequest = (): HttpRequest => ({
//   body: {
//     email: 'name',
//     password: 'password'
//   }
// })

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'passowrd'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })
})
