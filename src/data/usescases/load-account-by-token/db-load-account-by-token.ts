import { LoadAccountByTokenRepository } from '../../protocols/db/account'
import { AccountModel, LoadAccountByToken, Decrypter } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return null
  }
}
