export default class IsArray {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        if (value === null) return false;
        return Array.isArray(value);
    }

    errMessage() {
        return 'is not a valid array';
    }
}
