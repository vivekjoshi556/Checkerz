export default class IsBoolean {
  verify({ value }) {
    return typeof value === 'boolean'
  }

  errMessage(name) {
    return `${name} is not a valid boolean value.`
  }
}
