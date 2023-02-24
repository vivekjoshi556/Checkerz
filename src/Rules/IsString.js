export default class IsString {
    constructor(name) {
        this.name = name;
    }

    verify(value) {
        return typeof value === "string";
    }

    errMessage() {
        
    }
}