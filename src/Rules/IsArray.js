export default class IsArray {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return Array.isArray(value);
    }

    errMessage() {
        return `${this.name} is not a valid array.`;
    }
}