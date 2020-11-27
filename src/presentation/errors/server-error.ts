export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal error ocurred')
    this.name = 'ServerError'
    this.stack = stack
  }
}
