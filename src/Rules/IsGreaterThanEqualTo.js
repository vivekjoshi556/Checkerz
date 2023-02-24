export default class IsGreaterThanEqualTo {
    constructor(name, lower) {
        this.name = name;
        this.lower = lower;
    }

    verify(value) {
        return value >= this.lower;
    }

    errMessage() {
        return `must be greater than or equal to ${this.lower}`;
    }
}
