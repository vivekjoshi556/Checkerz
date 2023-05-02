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
import IsRequiredIf from './Rules/IsRequiredIf.js';
import IsConfirmed from './Rules/IsConfirmed.js';
import IsAcceptedIf from './Rules/IsAcceptedIf.js';
import IsDifferent from './Rules/IsDifferent.js';
import IsDigits from './Rules/IsDigits.js';
import IsDigitsBetween from './Rules/IsDigitsBetween.js';
import IsIn from './Rules/IsIn.js';
import IsNotIn from './Rules/IsNotIn.js';
import IsPresent from './Rules/IsPresent.js';

/**
 * List of Available Rules.
 * key: Respresents the name of the rule.
 * value: is an object :
 *      : rule: which rule to create.
 *      : idx: does the rule require key name
 *      : paramas: does rule require extra params for operation.
 *      : level: Priority of rule. Same value means only one of those rules can be present at once for a key.
 */
const rules = {
    'accepted': {rule: IsAccepted, idx: false, params: false, level: 0},
    'acceptedIf': {rule: IsAcceptedIf, idx: false, params: true, level: 0},
    'present': {rule: IsPresent, idx: true, params: false, level: 0},
    'required': {rule: IsRequired, idx: false, params: false, level: 0},
    'requiredIf': {rule: IsRequiredIf, idx: false, params: true, level: 0},

    'array': {rule: IsArray, idx: false, params: false, level: 1},
    'boolean': {rule: IsBoolean, idx: false, params: false, level: 1},
    'date': {rule: IsDate, idx: false, params: false, level: 1},
    'json': {rule: IsJSON, idx: false, params: false, level: 1},
    'number': {rule: IsNumber, idx: false, params: false, level: 1},
    'string': {rule: IsString, idx: false, params: false, level: 1},
    
    'after': {rule: IsAfter, idx: false, params: true, level: 101},
    'afterOrEqual': {rule: IsAfterOrEqual, idx: false, params: true, level: 102},
    'before': {rule: IsBefore, idx: false, params: true, level: 103},
    'beforeOrEqual': {rule: IsBeforeOrEqual, idx: false, params: true, level: 104},
    'confirmed': {rule: IsConfirmed, idx: true, params: false, level: 105},
    'email': {rule: IsValidEmail, idx: false, params: false, level: 106},
    'gt': {rule: IsGreaterThan, idx: false, params: true, level: 107},
    'gte': {rule: IsGreaterThanEqualTo, idx: false, params: true, level: 108},
    'len': {rule: IsLen, idx: false, params: true, level: 109},
    'lt': {rule: IsLessThan, idx: false, params: true, level: 110},
    'lte': {rule: IsLessThanEqualTo, idx: false, params: true, level: 111},
    'different': {rule: IsDifferent, idx: false, params: true, level: 112},
    'digits': {rule: IsDigits, idx: false, params: true, level: 113},
    'digitsBetween': {rule: IsDigitsBetween, idx: false, params: true, level: 114},

    'in': {rule: IsIn, idx: false, params: true, level: 115},
    'notIn': {rule: IsNotIn, idx: false, params: true, level: 115},
};

/**
 * Instantiate the given rule if it is valid rule name.
 * 
 * @param {String} type - type of rule to be created
 * @param {String} idx - Key name for which rule is created.
 * @param  {...any} params - any paramaeters required for rule.
 * @returns {Object} - Containing Rule and the Priority of Rule.
 */
export default function RuleFactory(type, idx, ...params) {
    if(!isValidRule(type))
        throw new ReferenceError(`"${type}" rule is not defined`);
    
    let requirements = [];
    if(rules[type].params) requirements = [...params];
    if(rules[type].idx) requirements = [...requirements, idx];
    
    return {rule: new rules[type].rule(requirements), level: rules[type].level};
}

/**
 * Checks if the given rule is valid or not.
 * @param {String} rule - rule to validate
 * @returns {Boolean} 
 */
export function isValidRule(rule) {
    return rule in rules;
}