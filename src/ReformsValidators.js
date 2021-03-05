import RequiredValidator from './validator/RequiredValidator'
import StringValidator from "./validator/StringValidator";

export default {
    ...RequiredValidator,
    ...StringValidator,
};
