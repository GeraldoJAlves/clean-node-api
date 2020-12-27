import { AccountModel } from '../models/account'

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
export interface AddAccountModel {
  name: string
  email: string
  password: string
}
