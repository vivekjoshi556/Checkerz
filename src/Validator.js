import RuleFactory from './RuleFactory.js';
import Response from './Response.js';

/**
 * @param {Object} [obj] - Validation rules created.
 */
export default class Validator {
    constructor(obj = {}) {
        this.attributes = this.process(obj);
    }

    /**
     * Set the workers for each attribute..
     *
     * @param {Object} obj  - object to be validated.
     * @param {Object} validators - validators to use.
     */
    process(obj) {
        const validators = {};
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object') { // If the value contains sub-properties for the current key.
                validators[key] = new Validator(obj[key]);
            } else { // If the value is the validators for current key.
                validators[key] = {
                    required: false,
                    optional: true,
                    workers: {},
                };
                const rules = obj[key].split('|');

                // Check each validator.
                rules.forEach((rule) => {
                    if (rule === 'required' || rule === 'optional') {
                        if (rule === 'required') {
                            validators[key].required = true;
                            validators[key].optional = false;
                        }
                    } else { // Split for properties that might have additional parameters.
                        const prop = rule.split(':');
                        validators[key].workers[[prop[0]]] = prop.length === 1 ? RuleFactory(prop[0]) : RuleFactory(prop[0], ...prop[1].split(','));
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
        this.#validate(obj, this.attributes, response, 'obj.');
        return response;
    }

    /**
     *
     * @param {Object} obj - object to be validated.
     * @param {Object} marker - the validator object.
     * @param {Response} response - response object.
     * @param {String} name - name of the object validating.
     */
    #validate(obj, marker, response, name) {
        const keys = Object.keys(obj); // Find the keys that should be present.
        Object.keys(marker).forEach((key) => {
            let val = obj[key] === undefined ? {} : obj[key];

            // If the key is a parent key.
            if (marker[key] instanceof Validator) {
                this.#validate(val, marker[key].attributes, response, `${name}${key}.`);
                return;
            }

            val = obj[key];
            const isPresent = new RuleFactory('required').verify(val);

            // If this key is required.
            if(marker[key].required && !isPresent) {
                response.errors.push(`${name}${key} property was required but was not found.`);
                return;
            }

            // If this key is optional then skip other validations if the value is not present.
            if(marker[key].optional && !isPresent) {
                return;
            }

            // If key is not present in given object.
            if (keys.includes(key)) {
                const { workers } = marker[key];
                Object.keys(workers).forEach((prop) => { // If the validation failed.
                    if (!workers[prop].verify(obj[key])) {
                        response.errors.push(`${name}${key} ${
                            workers[prop].errMessage()
                        }.`);
                    }
                });
            }
        });
    }
}
