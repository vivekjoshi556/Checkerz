import RuleFactory, { isValidRule } from './RuleFactory.js';
import Response from './Response.js';

/**
 * @param {Object} [obj] - Validation rules created.
 */
export default class Validator {
    constructor(obj = {}, name = "Obj") {
        this.name = name;
        this.attributes = this.process(obj, name);
    }

    /**
     * Set the workers for each attribute..
     *
     * @param {Object} obj  - object to be validated.
     * @param {Object} validators - validators to use.
     */
    process(obj, name) {
        const validators = {};
        name = name;
        Object.keys(obj).forEach((key) => {
            let _name = `${name}.${key}`;
            if (typeof obj[key] === 'object') { // If the value contains sub-properties for the current key.
                if(obj[key].hasOwnProperty("__name") && obj[key] !== undefined) {
                    _name = obj[key].__name;
                    delete obj[key].__name;
                }
                validators[key] = new Validator(obj[key], _name);
            } else { // If the value is the validators for current key.
                validators[key] = {
                    required: false,
                    workers: {},
                };
                const rules = obj[key].split('|');

                // Check last Property if it is a name.
                if(rules.length >= 1) {
                    const lastRule = rules[rules.length - 1].split(':')[0];
                    if(!isValidRule(lastRule)) {
                        _name = rules[rules.length - 1];
                        rules.pop();
                    }
                }

                // Check each validator.
                rules.forEach((rule) => {
                    if (rule === 'required')
                        validators[key].required = true;
                    else { // Split for properties that might have additional parameters.
                        const prop = rule.split(':');
                        validators[key].workers[[prop[0]]] = prop.length === 1 ? RuleFactory(prop[0], _name) : RuleFactory(prop[0], _name, ...prop[1].split(','));
                    }
                });
            }
        });

        return validators;
    }

    /**
     *
     * @param {Object} obj - object to be validated
     * @returns {Response}
     */
    check(obj) {
        const response = new Response();
        this.#validate(obj, this.attributes, response);
        return response;
    }

    /**
     *
     * @param {Object} obj - object to be validated.
     * @param {Object} marker - the validator object.
     * @param {Response} response - response object.
     * @param {String} name - name of the object validating.
     */
    #validate(obj, marker, response) {
        const keys = Object.keys(obj); // Find the keys that should be present.
        Object.keys(marker).forEach((key) => {
            let val = obj[key] === undefined ? {} : obj[key];

            // If the key is a parent key.
            if (marker[key] instanceof Validator) {
                this.#validate(val, marker[key].attributes, response);
                return;
            }

            val = obj[key];
            const isPresent = new RuleFactory('required').verify(val);

            // If this key is required.
            if(marker[key].required && !isPresent) {
                response.errors.push(`${key} property was required but was not found.`);
                return;
            }

            // If this key is optional then skip other validations if the value is not present.
            if(!marker[key].required && !isPresent) return;

            // If key is not present in given object.
            if (keys.includes(key)) {
                const { workers } = marker[key];
                Object.keys(workers).forEach((prop) => { // If the validation failed.
                    if (!workers[prop].verify(obj[key]))
                        response.errors.push(workers[prop].errMessage());
                });
            }
        });
    }
}
