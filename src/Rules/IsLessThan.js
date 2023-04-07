export default class IsLessThan {
    constructor(name, upper) {
        this.name = name;
        this.upper = upper;
    }

    verify(value) {
        return value < this.upper;
    }

    errMessage() {
        return `${this.name} length must be less than ${this.upper}.`;
    }
}