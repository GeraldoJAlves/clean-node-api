import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) {
      return null as unknown as string
    }
    const isCorrectPassword = await this.hashComparer.compare(authentication.password, account.password)
    if (!isCorrectPassword) {
      return null as unknown as string
    }
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.update(account.id, accessToken)
    return accessToken
  }
}
