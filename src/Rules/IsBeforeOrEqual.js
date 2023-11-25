import IsDate from './IsDate.js'

export default class IsBeforeOrEqual {
  constructor([start]) {
    this.start = new Date(start)

    this.rule = new IsDate()
    if (!this.rule.verify({ value: this.start })) {
      throw new Error('beforeOrEqual Rule: Invalid Date')
    }

    this.failedRule = undefined
  }

  verify({ value }) {
    const rule = new IsDate()
    if (!rule.verify({ value })) {
      this.failedRule = rule
      return false
    }

    return this.start.getTime() >= value.getTime()
  }

  errMessage(name) {
    if (this.failedRule !== undefined) return this.rule.errMessage(name)
    return `${name} must be a date before or equal to ${this.start}.`
  }
}
