import Validator from "../src/Validator.js"

test("Creating An Object", () => {
    let validator = new Validator({});
    
    // Valid Validator Instance
    expect(validator).toBeInstanceOf(Validator); 
    
    // Invalid Validator Instance
    expect(() => {
        new Validator({
            "name": "fun|sun"
        })
    }).toThrow(ReferenceError);
});