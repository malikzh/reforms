import _ from 'lodash'

function isEmpty(value) {
    return value === '' || value === null || value === undefined
        || (_.isArray(value) && value.length < 1);
}

export default {
    required(params) {
        const lang = params.lang.validation.required;
        const values = !params.multiple ? [params.value] : params.value;

        let result = [];

        for (const value of values) {
            const empty = isEmpty(value);

            result.push({
                isValid: !empty,
                messages: [
                    empty ? lang.not_specified : lang.specified,
                ],
            });
        }

        return result;
    },
    required_with(params, withoutMode) {
        const lang = params.lang.validation.required;
        const values = !params.multiple ? [params.value] : params.value;

        let result = [];

        if (!params.form) {
            return [];
        }

        if (!_.isArray(params.options) && params.options.length < 1) {
            throw new Error('Validator "required_if" requires option');
        }

        const form = params.form.container;
        const requiredWithFieldName = String(params.options[0]);

        for (const value of values) {
            if ((isEmpty(form[requiredWithFieldName]) && !withoutMode) || (!isEmpty(form[requiredWithFieldName]) && withoutMode)) {
                result.push({
                    isValid: true,
                    messages: [
                        lang.specified
                    ],
                });
                continue;
            }

            const empty = isEmpty(value);
            const isValid = Boolean(!empty);
            result.push({
                isValid: isValid,
                messages: [
                    isValid ? lang.specified : lang.not_specified,
                ],
            });
        }

        return result;
    },

    required_without(params) {
        return this.required_with(params, true)
    },
};
