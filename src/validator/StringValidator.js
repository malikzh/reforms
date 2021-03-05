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
    },
    email(params) {
        // got from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const rem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const lang = params.lang.validation.email;
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

            const isEmail = rem.test(String(value).toLowerCase());

            result.push({
                isValid: isEmail,
                messages: isEmail ? [] : [lang.must_be_email],
            });
        }

        return result;
    },
    url(params) {
        //
    },
    'in'(params, notMode) {
        //
    },
    not_in(params) {
        return this['in'](params, true);
    },
    regex(params) {
        //
    },
    starts_with(params) {
        //
    },
    ends_with(params) {
        //
    },
    contains(params) {
        //
    },
    alpha(params) {
        //
    },
    alphanum(params) {
        //
    },

};
