export default class IsJSON {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    }

    errMessage() {
        return `${this.name} is not a valid json.`;
    }
}
