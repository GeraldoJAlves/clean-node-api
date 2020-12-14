import env from '../../config/env'
import { makeLoginValidation } from './login-validation-factory'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { DbAuthentication } from '../../../data/usescases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(authentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
