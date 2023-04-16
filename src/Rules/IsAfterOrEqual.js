import IsDate from "./IsDate.js";

export default class IsAfterOrEqual {
    constructor(name, start) {
        this.name = name;
        this.start = new Date(start);

        if(!new IsDate(this.name).verify(this.start)) 
            throw new Error("Invalid Date");
        
        this.error = `${this.name} must be a date after or equal to ${this.start}.`;
    }

    verify(value) {
        let rule = new IsDate(this.name);
        if(!rule.verify(value)) {
            this.error = rule.errMessage();
            return false;
        }
        
        return this.start.getTime() <= value.getTime();
    }

    errMessage() {
        return this.error;
    }
}