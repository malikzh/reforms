import RequiredValidator from './validator/RequiredValidator'
import StringValidator from "./validator/StringValidator";
import BoolValidator from "./validator/BoolValidator";

export default {
    ...RequiredValidator,
    ...StringValidator,
    ...BoolValidator,
};
