export interface Encrypter {
  encrypt: (plaintext: string | object | Buffer) => Promise<string>
}
