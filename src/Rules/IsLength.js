export default class IsLength {
    constructor(name, ...params) {
        if(params.length == 0) 
            throw new Error("Atleast one argument is required with length validator.");

        this.name = name;
        this.mini = params[0];
        this.maxi = (params.length == 1) ? Number.MAX_SAFE_INTEGER : params[1];
    }

    verify(val) {
        return val.length >= this.mini && val.length <= this.maxi;
    }

    errMessage() {
        return this.maxi === Number.MAX_SAFE_INTEGER ? 
            `${this.name} length must be greater than or equal to ${this.mini}.` : 
            `${this.name} length must be in the range ${this.mini}-${this.maxi}.`;
    }
}