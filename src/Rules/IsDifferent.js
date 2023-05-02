export default class IsDifferent {
    constructor(keys) {
        this.keys = keys;
    }

    verify({value, parent, curr}) {
        for(let key of this.keys) {
            let active = key[0] === '.' ? parent : curr;
            let props = key.split('.');
            if(props[0] === '') props.shift();

            props.map(prop => {
                if(active === undefined) return false;
                active = active[prop];
            });
            if(active == value) return false;
        }
        
        return true;
    }

    errMessage(name) {
        return `${name} value was repeated.`;
    }
}