export default class IsDigits {
    constructor(len) {
        this.len = len;
    }

    verify({value}) {
        value = value.toString();
        for(let ch of value) {
            if(ch < '0' || ch > '9') {
                this.error = 1;
                return false;
            }
        }
        
        return value.length == this.len;
    }

    errMessage(name) {
        if(this.error === undefined) 
            return `${name} must have exactly ${this.len} digits.`;
        else if(this.error === 1)
            return `${name} is not a valid integer value.`;
    }
}
