export default class IsString {
    verify({value}) {
        return typeof value === "string";
    }

    errMessage(name) {
        return `${name} is not a valid String.`;
    }
}