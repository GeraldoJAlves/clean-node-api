import { LoadAccountByTokenRepository } from '../../protocols/db/account'
import { AccountModel, LoadAccountByToken, Decrypter } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) {
      return null
    }
    return await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
  }
}
