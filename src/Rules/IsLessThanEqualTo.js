export default class IsLessThanEqualTo {
    constructor(name, upper) {
        this.name = name;
        this.upper = upper;
    }

    verify(value) {
        return value <= this.upper;
    }

    errMessage() {
        return `${this.name} length must be less than or equal to ${this.upper}.`;
    }
}