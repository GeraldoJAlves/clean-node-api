import { Encrypter } from '../../../data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret) {}

  async encrypt (value: string | object | Buffer): Promise<string> {
    jwt.sign(value, this.secret)
    return await Promise.resolve('')
  }
}
