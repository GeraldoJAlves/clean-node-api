export interface Encrypter {
  encrypt: (value: string | object | Buffer) => Promise<string>
}
