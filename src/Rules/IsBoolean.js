export default class IsBoolean {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return typeof value === 'boolean';
    }

    errMessage() {
        return `${this.name} is not a valid boolean value.`;
    }
}
