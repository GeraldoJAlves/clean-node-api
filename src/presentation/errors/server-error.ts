export class ServerError extends Error {
  constructor () {
    super('Internal error ocurred')
    this.name = 'ServerError'
  }
}
