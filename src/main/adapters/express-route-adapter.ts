import { Request, RequestHandler, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const expressRouteAdapter = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const { statusCode, body } = await controller.handle(httpRequest)
    res.status(statusCode).json(body)
  }
}
