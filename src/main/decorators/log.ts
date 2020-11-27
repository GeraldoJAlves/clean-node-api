import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { statusCode, body } = await this.controller.handle(httpRequest)
    if (statusCode === 500) {
      console.error(body)
    }
    return { statusCode, body }
  }
}
