import RuleFactory, { isValidRule } from './RuleFactory.js';
import Response from './Response.js';

/**
 * @param {Object} [obj] - Validation rules created.
 */
export default class Validator {
    constructor(obj = {}, name = "Obj") {
        this.name = name;
        this.attributes = this.process(obj, name);
        this.values = undefined; // Object containing values for validation.
    }

    /**
     * Set the workers for each attribute..
     *
     * @param {Object} obj  - object to be validated.
     * @param {Object} validators - validators to use.
     */
    process(obj, name) {
        const validators = {};
        Object.keys(obj).forEach((key) => {
            let _name = `${name}.${key}`;

            if (typeof obj[key] === 'object') { // If the value contains sub-properties for the current key.
                if(obj[key].hasOwnProperty("__name") && obj[key] !== undefined) {
                    _name = obj[key].__name;
                    delete obj[key].__name;
                }
                validators[key] = new Validator(obj[key], _name);
            } else { // If the value is the validators for current key.
                validators[key] = {workers: {}};
                const rules = obj[key].split('|');

                // Check last Property if it is a name.
                if(rules.length >= 1) {
                    const lastRule = rules[rules.length - 1].split(':')[0];
                    if(!isValidRule(lastRule)) {
                        _name = rules[rules.length - 1];
                        rules.pop();
                    }
                }

                validators[key].name = _name;
                
                // Register workers.
                rules.forEach((rule) => {
                    const prop = rule.split(':');
                    
                    let { rule: ruleObj, level } = prop.length === 1 
                        ? RuleFactory(prop[0], key) 
                        : RuleFactory(prop[0], key, ...prop[1].split(','));

                    if(validators[key].workers[level] === undefined)
                        validators[key].workers[level] = ruleObj;
                    else 
                        throw new Error(`Conflicting Rules found for ${ _name }`);
                });

                // Ensures that rules are validated in a particular order.
                validators[key].workers = Object.keys(validators[key].workers).sort()
                    .reduce((accumulator, idx) => {
                        accumulator[idx] = validators[key].workers[idx];
                        return accumulator;
                    }, {});
            }
        });

        return validators;
    }

    /**
     * Function for user for using the validator.
     * 
     * @param {Object} obj - object to be validated
     * @returns {Response}
     */
    check(obj) {
        this.values = obj;
        const response = new Response();
        this.#validate(obj, this.attributes, response);
        this.values = undefined;
        return response;
    }

    /**
     * Function that performs the validation of provided values.
     * 
     * @param {Object} obj - object to be validated.
     * @param {Object} marker - the validator object.
     * @param {Response} response - response object.
     * @param {String} name - name of the object validating.
     */
    #validate(obj, marker, response) {
        // Find the keys that should be present according to the validator.
        const keys = Object.keys(marker); 

        // Check for each key in the given values.
        Object.keys(marker).forEach((key) => {
            let val = obj[key] === undefined ? {} : obj[key];

            // If the key is a parent key.
            if (marker[key] instanceof Validator) {
                this.#validate(val, marker[key].attributes, response);
                return;
            }

            const { workers } = marker[key];
            const workerKeys = Object.keys(workers);
            const isPresent = new RuleFactory('required').rule.verify({value: obj[key]});

            // If there is a required rule.
            if(workerKeys.includes('0')) {
                if(!workers['0'].verify({value: obj[key], parent: this.values, curr: obj})) {
                    response.errors.push(workers['0'].errMessage(marker[key].name));
                    return;
                }
            }

            // If this key is optional then skip other validations if the value is not present.
            if(!isPresent) return;


            // If key is not present in given object.
            if (keys.includes(key)) {
                for(let idx in workerKeys) {
                    let prop = workerKeys[idx];
                    if (!workers[prop].verify({value: obj[key], parent: this.values, curr: obj})) {
                        response.errors.push(workers[prop].errMessage(marker[key].name));
                        break;
                    }
                };
            }
        });
    }
}