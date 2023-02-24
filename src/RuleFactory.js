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

export default function RuleFactory(type, ...params) {
    switch(type) { // Type Rules:
        case 'array':
            return new IsArray(type);
        case 'boolean':
            return new IsBoolean(type);
        case 'json':
            return new IsJSON(type);
        case 'string':
            return new IsString(type);
        case 'number':
            return new IsNumber(type);

            // Value Property Rules:
        case 'email':
            return new IsValidEmail(type);
        case 'gt':
            return new IsGreaterThan(type, ...params);
        case 'gte':
            return new IsGreaterThanEqualTo(type, ...params);
        case 'len':
            return new IsLength(type, ...params);
        case 'lt':
            return new IsLessThan(type, ...params);
        case 'lte':
            return new IsLessThanEqualTo(type, ...params);
        case 'required':
            return new IsRequired(type);
        default:
            throw new ReferenceError(`${type} is not defined`);
    }
}
