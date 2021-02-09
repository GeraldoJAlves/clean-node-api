import { LogErrorRepository } from '@/data/protocols/db/log'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stackerror: string
  async logError (stackerror: string): Promise<void> {
    this.stackerror = stackerror
    return await Promise.resolve()
  }
}
