# Checkerz
A package for validating JS objects.

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
    name: 'string|required',
    address: {
        city: 'string|required|len:3,8', 
        state: 'string|required|len:3,8'
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
        city: 'string|required|len:3,6',
        state: 'string|required|len:3,8',
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
- json
- string
- number

Value Rules:
- email: <br />
    Checks if the value is a valid email.
- gt: <br />
    Checks if the value is greater than the given number.
- gte: <br />
    Checks if the value is greater than or equal to the given number.
- len: <br />
    * Checks if the length is in given range.
    * If a single value is given it is considered as lower limit.
        ```js
        "name": "len:3" // Length must be atleast 3 characters.
        ```
    * If 2 values are given 1st is considered lower and 2nd as upper limit.
        ```js
        "name": "len:3,6" // Length must be 3-6 characters.
        ```
- lt: <br />
    Checks if the value is less than the given number.
- lte: <br />
    Checks if the value is less than or equal to the given number.
- required: <br />
    Checks if the value is the value is present & must not be null or undefined.