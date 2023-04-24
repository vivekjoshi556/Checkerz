export default class IsConfirmed {
    constructor(key) {
        this.key = key;
    }
    
    verify({value, curr}) {
        return value === curr[this.key + "_confirmed"];
    }

    errMessage(name) {
        return `${name} confirmation failed.`;
    }
}