import _ from 'lodash';
import {createValidator, createMatcher} from "../Util";

export default {
    string: createValidator(createMatcher((v) => _.isString(v),
        'must_be_string'), 'string', true),
    email: createValidator(createMatcher(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
        'must_be_email'), 'email', true),
    url: createValidator(createMatcher(
        /^(https?):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/gi,
        'must_be_url'), 'url', true),
    alpha: createValidator(createMatcher(
        /^[a-z]+$/gi,
        'not_alpha',
    ), 'alpha', true),
    alphanum: createValidator(createMatcher(/^[a-z0-9]+$/gi,'not_alphanum'), 'alpha', true),
    'in': createValidator(createMatcher(
        (value, params, lang, langParams) => {
            langParams['values'] = params.options.join(', ');
            return !_.isArray(params.options) || params.options.includes(value);
        },
        'must_be_in'), 'in', true),
    not_in: createValidator(createMatcher(
        (value, params, lang, langParams) => {
            langParams['values'] = params.options.join(', ');
            return !_.isArray(params.options) || !params.options.includes(value);
        },
        'must_not_be_in'), 'in', true),
    regex: createValidator(createMatcher((value, params) =>
        !_.isArray(params.options) || params.options.length < 1 || Boolean(String(value).match(new RegExp(params.options[0], params.options.length > 1 ? params.options[1] : undefined))), 'not_match'), 'regex', true),
    starts_with: createValidator(createMatcher((value, params, lang, langParams) => {
        langParams['value'] = _.isArray(params.options) && params.options.length > 0 ? params.options[0] : '';

        return !_.isArray(params.options) || params.options.length < 1 || String(value).startsWith(params.options[0]);
        },
        'not_starts'
    ), 'starts_with', true),
    ends_with: createValidator(createMatcher((value, params, lang, langParams) => {
            langParams['value'] = _.isArray(params.options) && params.options.length > 0 ? params.options[0] : '';

            return !_.isArray(params.options) || params.options.length < 1 || String(value).endsWith(params.options[0]);
        },
        'not_ends'
    ), 'ends_with', true),
    contains: createValidator(createMatcher((value, params, lang, langParams) => {
            langParams['value'] = _.isArray(params.options) && params.options.length > 0 ? params.options[0] : '';

            return !_.isArray(params.options) || params.options.length < 1 || String(value).includes(params.options[0]);
        },
        'not_contains'
    ), 'contains', true),
};
