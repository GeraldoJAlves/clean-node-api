import { AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
export type AddAccountParams = Omit<AccountModel, 'id'>
