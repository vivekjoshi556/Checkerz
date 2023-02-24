export default class IsBoolean {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return typeof value === 'boolean';
    }

    errMessage() {
        return 'is not a valid boolean value';
    }
}
