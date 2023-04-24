import IsDate from "./IsDate.js";

export default class IsAfterOrEqual {
    constructor(start) {
        this.start = new Date(start);

        let rule = new IsDate();
        if(!rule.verify({value: this.start})) 
            throw new Error("Invalid Date in Validator.");
        
        this.failedRule = undefined;
    }

    verify({value}) {
        let rule = new IsDate();
        if(!rule.verify({value: value})) {
            this.failedRule = rule;
            return false;
        }
        
        return this.start.getTime() <= value.getTime();
    }

    errMessage(name) {
        if(this.failedRule !== undefined)
            return rule.errMessage(name);
        return `${name} must be a date after or equal to ${this.start}.`;
    }
}