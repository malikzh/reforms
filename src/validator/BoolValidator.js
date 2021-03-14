import {createValidator, createMatcher} from "../Util";

export default {
    checked: createValidator(createMatcher(
        (value) => value === true,
        'not_checked',
    ), 'checked', false),
};
