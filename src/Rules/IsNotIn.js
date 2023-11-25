export default class IsNotIn {
  constructor(arr) {
    this.arr = arr
  }

  verify({ value }) {
    value = value.toString()
    return !this.arr.includes(value)
  }

  errMessage(name) {
    return `${name} has one of the discarded values.`
  }
}
