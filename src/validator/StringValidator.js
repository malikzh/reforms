import _ from 'lodash';
import {createValidator} from "../Util";

export default {
    string: createValidator((value, params, lang) => {
        const isString = _.isString(value);

        return {
            isValid: isString,
            messages: [
                isString ? lang.is_string : lang.must_be_string,
            ],
        };
    }, 'string', true),
    email: createValidator((value, params, lang) => {
        // got from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const rem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

        const isEmail = rem.test(value);

        return {
            isValid: isEmail,
            messages: isEmail ? [] : [lang.must_be_email],
        };
    }, 'email', true),
    url: createValidator((value, params, lang) => {
        // got from: https://gist.github.com/rodneyrehm/8013067
        const rurl = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/gi;

        const isUrl = rurl.test(value);

        return {
            isValid: isUrl,
            messages: isUrl ? [] : [lang.must_be_url],
        };
    }, 'url', true),
    alpha(params) {
        //
    },
    alphanum(params) {
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
};
