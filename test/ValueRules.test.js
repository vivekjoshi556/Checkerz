import RuleFactory from "../src/RuleFactory.js";

describe("Type Rules Tests", () => {
    test.each([
        [RuleFactory("email"), "someone@127.0.0.1", false],
        [RuleFactory("email"), "a@b.b", false],
        [RuleFactory("email"), "example.com", false],
        [RuleFactory("email"), "test@test.test", true]
    ])("Email Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("gt", 6), 5, false],
        [RuleFactory("gt", 6), 6, false],
        [RuleFactory("gt", 6), 7, true]
    ])("Greater Than Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("gte", 6), 5, false],
        [RuleFactory("gte", 6), 6, true],
        [RuleFactory("gte", 6), 7, true]
    ])("Greater Than Equal To Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("len"), true, true],
    ])("Length Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("lt", 6), 5, true],
        [RuleFactory("lt", 6), 6, false],
        [RuleFactory("lt", 6), 7, false]
    ])("Less Than Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("lte", 6), 5, true],
        [RuleFactory("lte", 6), 6, true],
        [RuleFactory("lte", 6), 7, false]
    ])("Less Than Equal To Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("required"), "", true],
        [RuleFactory("required"), null, false],
        [RuleFactory("required"), undefined, false]
    ])("Required Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });
});