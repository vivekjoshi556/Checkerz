export default class IsAccepted {
    verify({value}) {
        const accepted = ["1", 1, "True", true, "yes", "on"];
        return accepted.includes(value);
    }

    errMessage(name) {
        return `${name} must be accepted.`;
    }
}
