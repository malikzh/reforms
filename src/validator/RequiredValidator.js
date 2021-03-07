import _ from 'lodash';
import {createValidator} from "../Util";

function isEmpty(value) {
    return value === '' || value === null || value === undefined
        || (_.isArray(value) && value.length < 1);
}

export default {
    required: createValidator((value, params, lang) => {
        const empty = isEmpty(value);

        return {
            isValid: !empty,
            messages: [
                empty ? lang.not_specified : lang.specified,
            ],
        };
    }, 'required', false),
    required_with: createValidator((value, params, lang, withoutMode) => {
        if (!params.form) {
            return;
        }

        if (!_.isArray(params.options) || params.options.length < 1) {
            throw new Error('Validator "required_if" requires option');
        }

        const form = params.form.container;


        for (const requiredWithFieldName of params.options) {
            if ((isEmpty(form[requiredWithFieldName]) && !withoutMode) || (!isEmpty(form[requiredWithFieldName]) && withoutMode)) {
                return {
                    isValid: true,
                    messages: [
                        lang.specified
                    ],
                };
            }
        }

        const empty = isEmpty(value);
        const isValid = Boolean(!empty);
        return {
            isValid: isValid,
            messages: [
                isValid ? lang.specified : lang.not_specified,
            ],
        };

    }, 'required', false),

    required_without(params) {
        return this.required_with(params, true);
    },
};
