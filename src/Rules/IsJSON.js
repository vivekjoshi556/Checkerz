export default class IsJSON {
    verify({value}) {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    }

    errMessage(name) {
        return `${name} is not a valid json.`;
    }
}
