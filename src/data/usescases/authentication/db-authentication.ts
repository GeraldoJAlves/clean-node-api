import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
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
    const accessToken = await this.tokenGenerator.generate(account.id)
    return accessToken
  }
}
