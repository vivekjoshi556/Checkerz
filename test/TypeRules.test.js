import RuleFactory from '../src/RuleFactory.js';

describe('Type Rules Tests', () => {
    test.each([
        [RuleFactory('array'), [1, 2, 3, 4], true],
        [RuleFactory('array'), {'a': '12'}, false],
        [RuleFactory('array'), 1, false],
        [RuleFactory('array'), '[1, 2, 3, 4]', false],
        [RuleFactory('array'), null, false]
    ])('Array Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory('boolean'), 12 + 12, false],
        [RuleFactory('boolean'), 1 > 2, true],
        [RuleFactory('boolean'), true, true],
        [RuleFactory('boolean'), false, true],
    ])('Boolean Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory('number'), 12, true],
        [RuleFactory('number'), 1.2, true],
        [RuleFactory('number'), -12, true],
        [RuleFactory('number'), '12', false],
        [RuleFactory('number'), '1.2', false],
        [RuleFactory('number'), '-12', false]
    ])('Numbers Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory('json'), 1, true]
    ])('JSON Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory('string'), '1', true],
        [RuleFactory('string'), 12, false],
    ])('String Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });
    
    test.each([
        [RuleFactory('date'), new Date("2023-04-14"), true],
        [RuleFactory('date'), new Date('2023-04-15'), true],
        [RuleFactory('date'), new Date('2023-04-15T10:30:00Z'), true],
        [RuleFactory('date'), new Date('2023-04-15T10:30:00'), true],
        [RuleFactory('date'), new Date('2023-04-32'), false],
        [RuleFactory('date'), new Date('2023-13-01'), false],
        [RuleFactory('date'), new Date('2023-04'), true],
        [RuleFactory('date'), new Date('2023'), true],
        [RuleFactory('date'), new Date('not a date'), false],
    ])('Date Rule', (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    // test.each([
    //     [RuleFactory('date'), "", true],
    // ])(' Rule', (rule, value, result) => {
    //     expect(rule.verify(value)).toBe(result);
    // });
});