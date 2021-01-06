import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usescases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usescases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  )
}
