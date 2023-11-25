export default class IsDifferent {
  constructor(keys) {
    this.keys = keys
  }

  verify({ value, parent, curr }) {
    for (const key of this.keys) {
      let active = key[0] === '.' ? parent : curr
      const props = key.split('.')
      if (props[0] === '') props.shift()

      props.map((prop) => {
        if (active === undefined) return false
        active = active[prop]
        return true
      })
      if (active === value) return false
    }

    return true
  }

  errMessage(name) {
    return `${name} value was repeated.`
  }
}
