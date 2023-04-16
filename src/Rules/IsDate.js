export default class IsDate {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return value instanceof Date && !isNaN(Date.parse(value));
    }

    errMessage() {
        return `${this.name} is not a valid date.`;
    }
}
