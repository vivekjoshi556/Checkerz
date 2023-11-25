export default class IsLength {
  constructor(params) {
    if (params.length === 0) {
      throw new Error(
        'len Rule: Atleast one argument is required with length validator.'
      )
    }

    this.mini = params[0]
    this.maxi = params.length === 1 ? Number.MAX_SAFE_INTEGER : params[1]
    this.error = 0
  }

  verify({ value }) {
    const type = value.constructor.name
    if (type !== 'Array' && type !== 'String') {
      this.error = 1
      return false
    }

    const len = value.length
    return len >= this.mini && len <= this.maxi
  }

  errMessage(name) {
    if (this.error === 0) {
      return this.maxi === Number.MAX_SAFE_INTEGER
        ? `${name} length must be greater than or equal to ${this.mini}.`
        : `${name} length must be in the range ${this.mini}-${this.maxi}.`
    } else return `${name} must be of type Array or String.`
  }
}
