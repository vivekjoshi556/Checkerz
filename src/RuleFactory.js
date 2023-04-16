import IsArray from './Rules/IsArray.js';
import IsBoolean from './Rules/IsBoolean.js';
import IsJSON from './Rules/IsJSON.js';
import IsString from './Rules/IsString.js';
import IsValidEmail from './Rules/IsValidEmail.js';
import IsGreaterThan from './Rules/IsGreaterThan.js';
import IsGreaterThanEqualTo from './Rules/IsGreaterThanEqualTo.js';
import IsLen from './Rules/IsLength.js';
import IsLessThan from './Rules/IsLessThan.js';
import IsLessThanEqualTo from './Rules/IsLessThanEqualTo.js';
import IsRequired from './Rules/IsRequired.js';
import IsNumber from './Rules/IsNumber.js';
import IsDate from './Rules/IsDate.js';
import IsAccepted from './Rules/IsAccepted.js';
import IsAfter from './Rules/IsAfter.js';
import IsAfterOrEqual from './Rules/IsAfterOrEqual.js';
import IsBefore from './Rules/IsBefore.js';
import IsBeforeOrEqual from './Rules/IsBeforeOrEqual.js';

const rules = {
    'accepted': IsAccepted,
    'array': IsArray,
    'after': IsAfter,
    'afterOrEqual': IsAfterOrEqual,
    'before': IsBefore,
    'beforeOrEqual': IsBeforeOrEqual,
    'boolean': IsBoolean,
    'date': IsDate,
    'email': IsValidEmail,
    'gt': IsGreaterThan,
    'gte': IsGreaterThanEqualTo,
    'json': IsJSON,
    'len': IsLen,
    'lt': IsLessThan,
    'lte': IsLessThanEqualTo,
    'number': IsNumber,
    'required': IsRequired,
    'string': IsString
};

export default function RuleFactory(type, name, ...params) {
    if(!isValidRule(type))
        throw new ReferenceError(`${type} is not defined`);
    
    return new rules[type](name, ...params);
}

export function isValidRule(rule) {
    return rule in rules;
}