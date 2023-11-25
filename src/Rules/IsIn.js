export default class IsIn {
  constructor(arr) {
    this.arr = arr
  }

  verify({ value }) {
    value = value.toString()
    return this.arr.includes(value)
  }

  errMessage(name) {
    return `${name} is not one of the expected values.`
  }
}
