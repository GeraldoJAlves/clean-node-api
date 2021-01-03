import { LoadAccountByTokenRepository } from '../../protocols/db/account'
import { AccountModel, LoadAccountByToken } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return null
  }
}
