export default class IsRequired {
    verify({value}) {
        return value !== null && value !== undefined;
    }

    errMessage(name) {
        return `${name} property was required but was not found.`;
    }
}