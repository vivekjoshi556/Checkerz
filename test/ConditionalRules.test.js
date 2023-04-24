import Validator from "../src/Validator.js";

let obj = {
    "key1": "val1",
    "key2": "val2",
    "key2": {
        "key21": "val21",
        "key22": "val22"
    }
};

let validator = new Validator({
    "key1": "string",
    "key2": {
        "key21": "string|requiredIf:.key1=val1",
        "key22": "string|requiredIf:key21=val21",
    }
});

describe("Type Rules Tests", () => {
    test.each([
        [, []],
        [['key2.key21:undefined'], ["Obj.key2.key21 is a required field."]],
        [['key2.key21:val21', 'key2.key22:undefined'], ["Obj.key2.key22 is a required field."]],
        [['key2.key21:newval21', 'key2.key22:undefined'], []],
    ])("RequiredIf Rule", (queryString, result) => {
        if(queryString !== undefined) {
            for(let idx in queryString) {
                let active = obj;
                let [key, value] = queryString[idx].split(':');
                let props = key.split('.');

                for (let i = 0; i < props.length - 1; i++) {
                    active = active[props[i]];
                };
                active[props[props.length - 1]] = value === 'undefined' ? undefined : value;
            }
        }
        
        expect(
            JSON.stringify(
                validator.check(obj).errors.sort()
            )
        ).toBe(
            JSON.stringify(
                result.sort()
            )
        );
    });
});