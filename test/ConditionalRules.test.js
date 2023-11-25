import Validator from '../src/Validator.js'
import { describe, test, expect } from '@jest/globals'

const updateObj = (queryString) => {
  if (queryString !== undefined) {
    for (const idx in queryString) {
      let active = obj
      const [key, value] = queryString[idx].split(':')
      const props = key.split('.')

      for (let i = 0; i < props.length - 1; i++) {
        active = active[props[i]]
      }
      active[props[props.length - 1]] =
        value === 'undefined' ? undefined : value
    }
  }
}

const obj = {
  key1: 'val1',
  key2: {
    key21: 'val21',
    key22: 'val22',
    key23: 'on'
  },
  key3: 'val3',
  key4: 'on'
}

const validator = new Validator({
  key1: 'string',
  key2: {
    key21: 'string|requiredIf:.key1=val1',
    key22: 'string|requiredIf:key21=val21|different:key21,.key3',
    key23: 'acceptedIf:key22=bar'
  },
  key3: 'string',
  key4: 'acceptedIf:.key1=foo'
})

describe('Type Rules Tests', () => {
  test.each([
    [undefined, []],
    [['key2.key21:undefined'], ['Obj.key2.key21 is a required field.']],
    [
      ['key2.key21:val21', 'key2.key22:undefined'],
      ['Obj.key2.key22 is a required field.']
    ],
    [['key2.key21:newval21', 'key2.key22:undefined'], []]
  ])('RequiredIf Rule', (queryString, result) => {
    updateObj(queryString)

    expect(JSON.stringify(validator.check(obj).errors.sort())).toBe(
      JSON.stringify(result.sort())
    )
  })
})

describe('Type Rules Tests', () => {
  test.each([
    [
      [
        'key1:val1',
        'key2.key21:val21',
        'key2.key22:val22',
        'key2.key23:on',
        'key3:val3',
        'key4:on'
      ],
      []
    ],
    [['key2.key21:val22'], ['Obj.key2.key22 value was repeated.']],
    [['key2.key21:val21', 'key3:val22'], ['Obj.key2.key22 value was repeated.']]
  ])('different Rule', (queryString, result) => {
    updateObj(queryString)
    expect(JSON.stringify(validator.check(obj).errors.sort())).toBe(
      JSON.stringify(result.sort())
    )
  })
})

describe('Type Rules Tests', () => {
  test.each([
    [
      [
        'key1:val1',
        'key2.key21:val21',
        'key2.key22:val22',
        'key2.key23:on',
        'key3:val3',
        'key4:on'
      ],
      []
    ],
    [['key2.key22:bar'], []],
    [['key2.key23:undefined'], ['Obj.key2.key23 field was not accepted.']],
    [['key2.key22:val22'], []],
    [['key1:foo'], []],
    [['key4:undefined'], ['Obj.key4 field was not accepted.']],
    [['key1:val1'], []]
  ])('Conditionally Accepted Rule', (queryString, result) => {
    updateObj(queryString)
    expect(JSON.stringify(validator.check(obj).errors.sort())).toBe(
      JSON.stringify(result.sort())
    )
  })
})
