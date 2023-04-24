export default class IsGreaterThanEqualTo {
    constructor(lower) {
        this.lower = lower;
    }

    verify({value}) {
        return value >= this.lower;
    }

    errMessage(name) {
        return `${name} must be greater than or equal to ${this.lower}.`;
    }
}
