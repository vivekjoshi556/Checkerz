export default class IsNumber {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return typeof value === "number";
    }

    errMessage() {
        return `${this.name} is not a valid number.`;
    }
}