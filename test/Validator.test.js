import Validator from '../src/Validator.js'
import { test, expect } from '@jest/globals'

test('Creating An Object', () => {
  const validator = new Validator({})

  // Valid Validator Instance
  expect(validator).toBeInstanceOf(Validator)

  // Invalid Validator Instance
  expect(() => {
    // eslint-disable-next-line no-unused-vars
    const validator = new Validator({
      name: 'fun|sun'
    })
  }).toThrow(ReferenceError)
})
