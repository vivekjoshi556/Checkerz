export default class IsRequired {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return value !== null && value !== undefined;
    }

    errMessage() {
        return "property was required but was not found";
    }
}