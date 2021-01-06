import { Decrypter, Encrypter } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret) {}
  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }

  async encrypt (value: string | object | Buffer): Promise<string> {
    const accessToken = await jwt.sign(value, this.secret)
    return accessToken
  }
}
