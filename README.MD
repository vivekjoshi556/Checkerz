# Checkerz
A package for validating JS objects motivated by Validators in [Lararvel framework](http://laravel.com).

## Installation
```
npm install checkerz
```

## Usage
Importing the Validator Constructor

```js
// ES5 Syntax
const Validator = require("Checkerz");

// ES6 Syntax
import Validator from "Checkerz";
```

Once the constructor is imported you can create as many validator as you like and validate your objects.

## Examples

```js
// Rules validator should use.
const rules = {
    name: "string|required",
    address: {
        city: "string|required|len:3,8", 
        state: "string|required|len:3,8"
    },
};

// Creating a new Validator.
const userValidator = new Validator(rules);

// Object to validate.
let user = {
    address: {
        city: "Albany",
        state: "NYK"
    }
}

// Validate the object using the check() function of validator.
let response = userValidator.check(user);

// Check if the validation passed using passed property of the response.
if(!response.passed) {
    // Response's error property contians an array of all the errors.
    console.log(err);
}

```
Ouput:
```html
[ 'name property was required but was not found.' ]
```
## Creating Validator
- Rules for a value are seperated by `|`.

    ```js
    [key]: "[rule1] | [rule2] | [rule3]"
    ```

- If name of the rule and it's parameters are separated by `:` and the parameters themselves are separated by `,`
    
    ```js
    "name": "len:3,10" // Checks length of name is 3-10.
    ```

- If you want to change the name of the key when displaying error message you can pass the name you want as the last value when specifying rules.
    
    ```js
    [key]: "[rule1] | [rule2] | [name]"
    ```
    
    #### ** The new name must not match any rule.

- If you want to change the name of the key the value of which is an object, you can pass in a __name property and specify the name you want to use.
    
    ```js
    address: {
        city: "string|required|len:3,6",
        state: "string|required|len:3,8",
        __name: "Address"
    },
    ```

    #### ** All the errors in any child will be referenced with respect to that name.
    For eg. If the state's len property fails the name used will be 'Address.city' in the error message.

## Available Rules
Type Rules:
Checks whether the values is of the type specified.
- array
- boolean
- date
- json
- string
- number

Value Rules:
- Accepted: <br />
    - Checks if the value is one of the following values: "1", 1, "True", true, "yes", "on".
    - Can be used for checkboxes like for terms & conditions.

        ```js
        // Validator Rules:
        const rules = {
            "tnc": "accepted"
        };
        ```

- After: <br />
    - Checks if the a particular date is after a given date.
    - Can be used to check if user is not giving an invalid date.
    
        ```js
        // Validator Rules:
        const rules = {
            "dob": "after:2023/07/01",
        };
        ```

- AfterOrEqual: <br />
    - Similar to after but also returns true for same day.

        ```js
        // Validator Rules:
        const rules = {
            "dob": "afterOrEqual:2023/07/01",
        };
        ```

- Before: <br />
    - Checks if the a particular date is before a given date.
    - Can be used to check age limit based on DOB.
    
        ```js
        // Validator Rules:
        const rules = {
            "dob": "before:2023/07/01",
        };
        ```

- BeforeOrEqual: <br />
    - Similar to before but also returns true for same day.

- confirmed: <br />
    - Looks for a key named "{current_key_name}_confirmed" in the object at same level, & sees if the values match.
    - Can be used for passwords.

        ```js
        // Validator Rules:
        const rules = {
            "email": "email",
            "password": "string|confirmed"
        };

        // Object to validate.
        let user = {
            "email": "test@checkerz.com",
            "password": "password",
            "password_confirmed": "password"
        };
        ```

- email: <br />
    Checks if the value is a valid email.

- gt: <br />
    Checks if the value is greater than the given number.

- gte: <br />
    Checks if the value is greater than or equal to the given number.

- len: <br />
    - Expects the value to be validated to be an Array or a String.
    - Checks if the length is in given range.
    - If a single value is given it is considered as lower limit.

        ```js
        "name": "len:3" // Length must be atleast 3 characters.
        ```
        
    - If 2 values are given 1st is considered lower and 2nd as upper limit.
    
        ```js
        "name": "len:3,6" // Length must be 3-6 characters.
        ```

- lt: <br />
    Checks if the value is less than the given number.

- lte: <br />
    Checks if the value is less than or equal to the given number.

- required: <br />
    Checks if the value is the value is present & must not be null or undefined.

- requiredIf: <br />
    - Conditional version of required. 
    - The values is required if a certain key matches some value. If the specified doesn't match the specified value then this becomes an optional field.
    - Since, we are using objects we have 2 method to reference a key in the object. 
        - Starting at top: To access from top start with a '.' and then traverse the object as you would with a dot notation. In the example below state is required phone.type = home. (Notice how it starts with a '.').

        - Starting at current level: Traverse the object as you would with a dot notation. (Notice that since it is at same level no '.' is required).
    <br />

    ```js
    // Rules validator should use.
    const rules = {
        "person": {
            "name": "string|required",
            "address": {
                "state": "string|requiredIf:.phone.type=home",
                "zip": "string|requiredIf:state=NY"
            }
        },
        "phone": {
            "number": "string|required",
            "type": "string|required"
        }
    };
    ```
