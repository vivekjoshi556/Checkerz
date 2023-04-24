export default class IsGreaterThan {
    constructor(lower) {
        this.lower = lower;
    }

    verify({value}) {
        return value > this.lower;
    }

    errMessage(name) {
        return `${name} must be greater than ${this.lower}.`;
    }
}
