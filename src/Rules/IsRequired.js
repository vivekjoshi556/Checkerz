export default class IsRequired {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return value !== null && value !== undefined;
    }

    errMessage() {
        return `${this.name} property was required but was not found.`;
    }
}