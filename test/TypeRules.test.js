import RuleFactory from '../src/RuleFactory.js'
import { describe, test, expect } from '@jest/globals'

const name = 'test'
describe('Type Rules Tests', () => {
  test.each([
    [RuleFactory('array', name).rule, [1, 2, 3, 4], true],
    [RuleFactory('array', name).rule, { a: '12' }, false],
    [RuleFactory('array', name).rule, 1, false],
    [RuleFactory('array', name).rule, '[1, 2, 3, 4]', false],
    [RuleFactory('array', name).rule, null, false]
  ])('Array Rule', (rule, value, result) => {
    expect(rule.verify({ value })).toBe(result)
  })

  test.each([
    [RuleFactory('boolean', name).rule, 12 + 12, false],
    [RuleFactory('boolean', name).rule, 1 > 2, true],
    [RuleFactory('boolean', name).rule, true, true],
    [RuleFactory('boolean', name).rule, false, true]
  ])('Boolean Rule', (rule, value, result) => {
    expect(rule.verify({ value })).toBe(result)
  })

  test.each([
    [RuleFactory('number', name).rule, 12, true],
    [RuleFactory('number', name).rule, 1.2, true],
    [RuleFactory('number', name).rule, -12, true],
    [RuleFactory('number', name).rule, '12', false],
    [RuleFactory('number', name).rule, '1.2', false],
    [RuleFactory('number', name).rule, '-12', false]
  ])('Numbers Rule', (rule, value, result) => {
    expect(rule.verify({ value })).toBe(result)
  })

  test.each([[RuleFactory('json', name).rule, 1, true]])(
    'JSON Rule',
    (rule, value, result) => {
      expect(rule.verify({ value })).toBe(result)
    }
  )

  test.each([
    [RuleFactory('string', name).rule, '1', true],
    [RuleFactory('string', name).rule, 12, false]
  ])('String Rule', (rule, value, result) => {
    expect(rule.verify({ value })).toBe(result)
  })

  test.each([
    [RuleFactory('date', name).rule, new Date('2023-04-14'), true],
    [RuleFactory('date', name).rule, new Date('2023-04-15'), true],
    [RuleFactory('date', name).rule, new Date('2023-04-15T10:30:00Z'), true],
    [RuleFactory('date', name).rule, new Date('2023-04-15T10:30:00'), true],
    [RuleFactory('date', name).rule, new Date('2023-04-32'), false],
    [RuleFactory('date', name).rule, new Date('2023-13-01'), false],
    [RuleFactory('date', name).rule, new Date('2023-04'), true],
    [RuleFactory('date', name).rule, new Date('2023'), true],
    [RuleFactory('date', name).rule, new Date('not a date'), false]
  ])('Date Rule', (rule, value, result) => {
    expect(rule.verify({ value })).toBe(result)
  })

  // test.each([
  //     [RuleFactory('date', name).rule, "", true],
  // ])(' Rule', (rule, value, result) => {
  //     expect(rule.verify({value})).toBe(result);
  // });
})
