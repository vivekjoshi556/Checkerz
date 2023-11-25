export default class IsLessThan {
  constructor([upper]) {
    this.upper = upper
  }

  verify({ value }) {
    return value < this.upper
  }

  errMessage(name) {
    return `${name} length must be less than ${this.upper}.`
  }
}
