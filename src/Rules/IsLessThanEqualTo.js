export default class IsLessThanEqualTo {
  constructor([upper]) {
    this.upper = upper
  }

  verify({ value }) {
    return value <= this.upper
  }

  errMessage(name) {
    return `${name} length must be less than or equal to ${this.upper}.`
  }
}
