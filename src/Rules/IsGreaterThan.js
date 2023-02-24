export default class IsGreaterThan {
    constructor(name, lower) {
        this.name = name;
        this.lower = lower;
    }

    verify(value) {
        return value > this.lower;
    }

    errMessage() {
        return `must be greater than ${this.lower}`;
    }
}
