import RuleFactory from '../src/RuleFactory.js';

describe('Type Rules Tests', () => {
    test.each([
        [new RuleFactory('array'), [1, 2, 3, 4], true],
        [new RuleFactory('array'), {'a': '12'}, false],
        [new RuleFactory('array'), 1, false],
        [new RuleFactory('array'), '[1, 2, 3, 4]', false],
    ])('Array Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [new RuleFactory('boolean'), 12 + 12, false],
        [new RuleFactory('boolean'), 1 > 2, true],
        [new RuleFactory('boolean'), true, true],
        [new RuleFactory('boolean'), false, true],
    ])('Boolean Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [new RuleFactory('number'), 12, true],
        [new RuleFactory('number'), 1.2, true],
        [new RuleFactory('number'), -12, true],
        [new RuleFactory('number'), '12', false],
        [new RuleFactory('number'), '1.2', false],
        [new RuleFactory('number'), '-12', false]
    ])('Numbers Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [new RuleFactory('json'), 1, true]
    ])('JSON Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [new RuleFactory('string'), '1', true],
        [new RuleFactory('string'), 12, false],
    ])('String Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });
});