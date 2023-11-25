export default class IsDate {
  verify({ value }) {
    return value instanceof Date && !isNaN(Date.parse(value))
  }

  errMessage(name) {
    return `${name} is not a valid date.`
  }
}
