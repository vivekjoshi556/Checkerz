export default class IsArray {
  verify({ value }) {
    return Array.isArray(value)
  }

  errMessage(name) {
    return `${name} is not a valid array.`
  }
}
