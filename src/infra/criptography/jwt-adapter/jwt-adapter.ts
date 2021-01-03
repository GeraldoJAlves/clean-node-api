import { Decrypter, Encrypter } from '../../../data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret) {}
  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }

  async encrypt (value: string | object | Buffer): Promise<string> {
    const accessToken = await jwt.sign(value, this.secret)
    return accessToken
  }
}
