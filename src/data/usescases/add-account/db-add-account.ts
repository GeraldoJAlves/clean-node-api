import { AddAccount, Encrypter, AddAccountModel, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashPassword = await this.encrypter.encrypt(account.password)

    const newAccount = {
      ...account,
      password: hashPassword,
      id: 'valid_id'
    }

    return await new Promise(resolve => resolve(newAccount))
  }
}
