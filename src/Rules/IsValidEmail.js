export default class IsValidEmail {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return value.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    }

    errMessage() {
        return `${this.name} is not a valid email.`;
    }
}