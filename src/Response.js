export default class Response {
  constructor() {
    this.errors = []
  }

  get passed() {
    return this.errors.length === 0
  }

  errors() {
    return this.errors
  }
}
