import RuleFactory from "../src/RuleFactory.js";

//! Check for unexpected data types in tests.
const name = "Test";
describe("Type Rules Tests", () => {
    test.each([
        [RuleFactory("email", name), "someone@127.0.0.1", false],
        [RuleFactory("email", name), "a@b.b", false],
        [RuleFactory("email", name), "example.com", false],
        [RuleFactory("email", name), "test@test.test", true]
    ])("Email Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("gt", name, 6), 5, false],
        [RuleFactory("gt", name, 6), 6, false],
        [RuleFactory("gt", name, 6), 7, true]
    ])("Greater Than Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("gte", name, 6), 5, false],
        [RuleFactory("gte", name, 6), 6, true],
        [RuleFactory("gte", name, 6), 7, true]
    ])("Greater Than Equal To Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("len", name, 1), "true", true],
        [RuleFactory("len", name, 1), "", false],
        [RuleFactory("len", name, 1, 2), "true", false],
        [RuleFactory("len", name, 1, 2), "22", true],
    ])("Length Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("lt", name, 6), 5, true],
        [RuleFactory("lt", name, 6), 6, false],
        [RuleFactory("lt", name, 6), 7, false]
    ])("Less Than Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("lte", name, 6), 5, true],
        [RuleFactory("lte", name, 6), 6, true],
        [RuleFactory("lte", name, 6), 7, false]
    ])("Less Than Equal To Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    test.each([
        [RuleFactory("required", name), "", true],
        [RuleFactory("required", name), null, false],
        [RuleFactory("required", name), undefined, false]
    ])("Required Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });
});