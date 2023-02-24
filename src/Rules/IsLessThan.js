export default class IsLessThan {
    constructor(name, upper) {
        this.name = name;
        this.upper = upper;
    }

    verify(value) {
        return value < this.upper;
    }

    errMessage() {
        
    }
}