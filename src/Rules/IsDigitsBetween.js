export default class IsDigitsBetween {
    constructor(params) {
        if(params.length < 2) 
            throw new Error("digitsBetween Rule: Expected 2 values got only One.");
        this.lower = params[0];
        this.upper = params[1];
    }

    verify({value}) {
        value = value.toString();
        for(let ch of value) {
            if(ch < '0' || ch > '9') {
                this.error = 1;
                return false;
            }
        }
        
        return value.length >= this.lower && value.length <= this.upper;
    }

    errMessage(name) {
        if(this.error === undefined) 
            return `${name} must have digits in range of ${this.lower}-${this.upper}.`;
        else if(this.error === 1)
            return `${name} is not a valid integer value.`;
    }
}
