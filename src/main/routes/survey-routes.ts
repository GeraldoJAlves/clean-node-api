import { Router } from 'express'
import { expressMiddlewareAdapter } from '../adapters/express-middleware-adapter'
import { expressRouteAdapter } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = expressMiddlewareAdapter(makeAuthMiddleware('admin'))
  const auth = expressMiddlewareAdapter(makeAuthMiddleware())
  router.post('/surveys', adminAuth, expressRouteAdapter(makeAddSurveyController()))
  router.get('/surveys', auth, expressRouteAdapter(makeLoadSurveysController()))
}
