import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/enctryper'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return ''
  }
}