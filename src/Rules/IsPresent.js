export default class IsPresent {
    constructor(params) {
        this.key = params[0];
    }

    verify({curr}) {
        return Object.keys(curr).includes(this.key);
    }

    errMessage(name) {
        return `${name} was expected but was not present.`;
    }
}
