export default class IsAccepted {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        const accepted = ["1", 1, "True", true, "yes", "on"];
        return accepted.includes(value);
    }

    errMessage() {
        return `${this.name} is not a valid boolean value.`;
    }
}
