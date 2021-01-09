import { AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
export type AddAccountModel = Omit<AccountModel, 'id'>
