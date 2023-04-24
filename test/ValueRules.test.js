import RuleFactory from "../src/RuleFactory.js";

const name = "test";
describe("Type Rules Tests", () => {
    test.each([
        [RuleFactory("email", name).rule, "someone@127.0.0.1", false],
        [RuleFactory("email", name).rule, "a@b.b", false],
        [RuleFactory("email", name).rule, "example.com", false],
        [RuleFactory("email", name).rule, "test@test.test", true]
    ])("Email Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("gt", name, 6).rule, 5, false],
        [RuleFactory("gt", name, 6).rule, 6, false],
        [RuleFactory("gt", name, 6).rule, 7, true]
    ])("Greater Than Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("gte", name, 6).rule, 5, false],
        [RuleFactory("gte", name, 6).rule, 6, true],
        [RuleFactory("gte", name, 6).rule, 7, true]
    ])("Greater Than Equal To Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("len", name, 1).rule, "true", true],
        [RuleFactory("len", name, 1).rule, "", false],
        [RuleFactory("len", name, 1, 2).rule, "true", false],
        [RuleFactory("len", name, 1, 2).rule, "22", true],
        [RuleFactory("len", name, 1, 2).rule, ["22", 2], true],
        [RuleFactory("len", name, 1, 2).rule, ["22", [2, 3, 4]], true],
    ])("Length Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("lt", name, 6).rule, 5, true],
        [RuleFactory("lt", name, 6).rule, 6, false],
        [RuleFactory("lt", name, 6).rule, 7, false]
    ])("Less Than Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("lte", name, 6).rule, 5, true],
        [RuleFactory("lte", name, 6).rule, 6, true],
        [RuleFactory("lte", name, 6).rule, 7, false]
    ])("Less Than Equal To Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("required", name).rule, "", true],
        [RuleFactory("required", name).rule, null, false],
        [RuleFactory("required", name).rule, undefined, false]
    ])("Required Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("accepted", name).rule, "1", true],
        [RuleFactory("accepted", name).rule, 1, true],
        [RuleFactory("accepted", name).rule, "True", true],
        [RuleFactory("accepted", name).rule, true, true],
        [RuleFactory("accepted", name).rule, "yes", true],
        [RuleFactory("accepted", name).rule, "on", true],
        [RuleFactory("accepted", name).rule, " ", false],
        [RuleFactory("accepted", name).rule, "", false],
        [RuleFactory("accepted", name).rule, 2, false],
    ])("Required Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("after", name, new Date("2023-04-14")).rule, new Date("2023-04-14"), false],
        [RuleFactory("after", name, new Date("2023-04-14")).rule, new Date("2023-04-13"), false],
        [RuleFactory("after", name, new Date("2023-04-14")).rule, new Date("2023-04-15"), true],

        [RuleFactory("afterOrEqual", name, new Date("2023-04-14")).rule, new Date("2023-04-14"), true],
        [RuleFactory("afterOrEqual", name, new Date("2023-04-14")).rule, new Date("2023-04-13"), false],
        [RuleFactory("afterOrEqual", name, new Date("2023-04-14")).rule, new Date("2023-04-15"), true],

        [RuleFactory("before", name, new Date("2023-04-14")).rule, new Date("2023-04-14"), false],
        [RuleFactory("before", name, new Date("2023-04-14")).rule, new Date("2023-04-13"), true],
        [RuleFactory("before", name, new Date("2023-04-14")).rule, new Date("2023-04-15"), false],

        [RuleFactory("beforeOrEqual", name, new Date("2023-04-14")).rule, new Date("2023-04-14"), true],
        [RuleFactory("beforeOrEqual", name, new Date("2023-04-14")).rule, new Date("2023-04-13"), true],
        [RuleFactory("beforeOrEqual", name, new Date("2023-04-14")).rule, new Date("2023-04-15"), false],
    ])("Date Rule", (rule, value, result) => {
        expect(rule.verify({value: value})).toBe(result);
    });

    test.each([
        [RuleFactory("confirmed", name).rule, {"value": "something", "curr": {"test_confirmed": "something"}}, true],
        [RuleFactory("confirmed", name).rule, {"value": "something", "curr": {"test_confirmed": "somethingElse"}}, false],
        [RuleFactory("confirmed", name).rule, {"value": "something", "curr": {}}, false],
    ])("# Rule", (rule, value, result) => {
        expect(rule.verify(value)).toBe(result);
    });

    // test.each([
    //     [RuleFactory(""), , true],
    // ])("# Rule", (rule, value, result) => {
    //     expect(rule.verify({value: value})).toBe(result);
    // });
});