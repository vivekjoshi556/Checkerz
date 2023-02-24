import Validator from './src/Validator.js';

const validator = new Validator({
    name: 'string|required',
    address: {
        city: 'string|required|len:3,6',
        state: 'string|required|len:3,8',
    },
    age: 'required|number',
    dob: {
        date: 'string|gte:1|lte:31',
        month: 'string|required|gte:1|lte:12',
        year: 'json|gte:1990|lte:2015',
    },
});

const test = {
    name: 'Vivek Joshi',
    age: '12',
    address: {
        city: 'HLD',
        state: 'UK',
    },
};

const response = validator.check(test);

if(!response.passed) {
    response.errors.forEach((err) => {
        console.log(err);
    });
}
