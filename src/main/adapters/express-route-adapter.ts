import { Request, RequestHandler, Response } from 'express'
import { Controller, HttpRequest } from '@/presentation/protocols'

export const expressRouteAdapter = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId
    }
    const { statusCode, body } = await controller.handle(httpRequest)
    if (statusCode >= 200 && statusCode <= 299) {
      res.status(statusCode).json(body)
    } else {
      res.status(statusCode).json({
        error: body.message
      })
    }
  }
}
