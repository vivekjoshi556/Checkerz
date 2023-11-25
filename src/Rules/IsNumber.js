export default class IsNumber {
  verify({ value }) {
    return typeof value === 'number'
  }

  errMessage(name) {
    return `${name} is not a valid number.`
  }
}
