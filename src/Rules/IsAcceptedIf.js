export default class IsAcceptedIf {
    constructor([conditions]) {
        this.key = conditions.split('=')[0];
        this.value = conditions.split('=')[1];
    }

    verify({value, parent, curr}) {
        let active = this.key[0] === '.' ? parent : curr;
        let props = this.key.split('.');
        if(props[0] === '') props.shift();
        
        //! Return appropriate response here.
        props.map(prop => {
            if(active === undefined) return false;
            active = active[prop];
        });

        const { rule } = new RuleFactory("accepted");
        return (active === this.value && rule.verify({value}) || active !== this.value);
    }

    errMessage(name) {
        return `${name} field was not accepted.`;
    }
}
