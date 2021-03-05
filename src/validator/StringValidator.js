import _ from 'lodash';

export default {
    string(params) {
        const lang = params.lang.validation.string;
        const values = !params.multiple ? [params.value] : params.value;

        let result = [];

        for (const value of values) {
            if (_.isNil(value)) {
                result.push({
                    isValid: true,
                    messages: [],
                });
                continue;
            }

            const isString = _.isString(value);

            result.push({
                isValid: isString,
                messages: [
                    isString ? lang.is_string : lang.must_be_string,
                ],
            });
        }

        return result;
    }
};
