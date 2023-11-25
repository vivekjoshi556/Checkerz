import RuleFactory from '../RuleFactory.js'

export default class IsRequiredIf {
  constructor([conditions]) {
    this.key = conditions.split('=')[0]
    this.value = conditions.split('=')[1]
  }

  verify({ value, parent, curr }) {
    let active = this.key[0] === '.' ? parent : curr
    const props = this.key.split('.')
    if (props[0] === '') props.shift()

    //! Return appropriate response here.
    props.map((prop) => {
      if (active === undefined) return false
      active = active[prop]
      return true
    })

    const { rule } = new RuleFactory('required')
    return (
      (active === this.value && rule.verify({ value })) || active !== this.value
    )
  }

  errMessage(name) {
    return `${name} is a required field.`
  }
}
