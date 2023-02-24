export default class IsLength {
    constructor(name, ...params) {
        if(params.length == 0) 
            throw new Error("Atleast one argument is required with length validator.");

        this.name = name;
        if(params.length == 1) {
            this.mini = params[0];
            this.maxi = -1;
        }
        else if(params.length == 2) {
            this.mini = params[0];
            this.maxi = params[1];
        }
    }

    verify(val) {
        if(typeof val === 'string') return true;
        return true;
    }

    errMessage() {
        return '';
    }
}