import IsArray from './Rules/IsArray.js';
import IsBoolean from './Rules/IsBoolean.js';
import IsJSON from './Rules/IsJSON.js';
import IsString from './Rules/IsString.js';
import IsValidEmail from './Rules/IsValidEmail.js';
import IsGreaterThan from './Rules/IsGreaterThan.js';
import IsGreaterThanEqualTo from './Rules/IsGreaterThanEqualTo.js';
import IsLength from './Rules/IsLength.js';
import IsLessThan from './Rules/IsLessThan.js';
import IsLessThanEqualTo from './Rules/IsLessThanEqualTo.js';
import IsRequired from './Rules/IsRequired.js';
import IsNumber from './Rules/IsNumber.js';

const rules = ['array', 'boolean', 'json', 'string', 'number', 'email', 'gt', 'gte', 'len', 'lt', 'lte', 'required'];

export default function RuleFactory(type, name, ...params) {
    if(!isValidRule(type))
        throw new ReferenceError(`${type} is not defined`);

    switch(type) { 
        // Type Rules:
        case 'array':
            return new IsArray(name);
        case 'boolean':
            return new IsBoolean(name);
        case 'json':
            return new IsJSON(name);
        case 'string':
            return new IsString(name);
        case 'number':
            return new IsNumber(name);

        // Value Property Rules:
        case 'email':
            return new IsValidEmail(name);
        case 'gt':
            return new IsGreaterThan(name, ...params);
        case 'gte':
            return new IsGreaterThanEqualTo(name, ...params);
        case 'len':
            return new IsLength(name, ...params);
        case 'lt':
            return new IsLessThan(name, ...params);
        case 'lte':
            return new IsLessThanEqualTo(name, ...params);
        case 'required':
            return new IsRequired(name);
    }
}

export function isValidRule(rule) {
    return rules.includes(rule);
}