import _ from 'lodash';
const Flex = require('flex-js');

export const CHARS_ALPHA_LO = 'abcdefghijklmnopqrstuvwxyz';
export const CHARS_ALPHA_HI = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const CHARS_NUMBER   = '0123456789';

/**
 * Create getter & setter for v-model value
 *
 * @param {String?} propName v-model Property name
 * @returns {{set(*=): void, get(): *}|*}
 */
export function modelValue(propName, castTo) {
    propName = propName || 'modelValue';
    castTo = castTo || ((value) => value);


    return {
        get() {
            return castTo(this[propName]);
        },
        set(value) {
            this.$emit('update:' + propName, castTo(value));
        },
    };
}

/**
 * Merge classes for vue v-bind:class={}
 *
 * @param {String|Object|String[]}classes
 * @returns {Object}
 */
export function mergeClasses(...classes) {
    let result = {};

    const stringArrayToObject = (stringArray, result) => {
        stringArray.forEach((className) => {
            result[className] = true;
        });
    };

    for (const clazz of classes) {
        if (_.isString(clazz)) {
            stringArrayToObject(clazz.split(' ').filter((k) => Boolean(k)), result);
        } else if (_.isArray(clazz)) {
            stringArrayToObject(clazz.filter((k) => Boolean(k)), result);
        } else if (_.isObject(clazz)) {
            _.merge(result, clazz);
        }
    }

    return result;
}

/**
 * Generate random string from characters
 *
 * @param {number} length
 * @param {string} characters
 * @returns {string}
 */
export function randomStringFromChars(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Return random id
 *
 * @param {number} length
 * @returns {string}
 */
export function randomId(length) {
    return randomStringFromChars(length > 0 ? 1 : 0, CHARS_ALPHA_LO + CHARS_ALPHA_HI)
         + randomStringFromChars(length - 1, CHARS_ALPHA_HI + CHARS_ALPHA_LO + CHARS_NUMBER);
}

/**
 * Create validator function
 *
 * @param {Function} valueValidator
 * @param {String} lang
 * @param {Boolean} skipNil
 * @return {Function}
 */
export function createValidator(valueValidator, lang, skipNil) {
    return function(params, ...args) {
        let result = [];

        for (const value of (params.multiple ? params.value : [params.value])) {

            if (skipNil && _.isNil(value)) {
                result.push({
                    isValid: true,
                    messages: [],
                });
                continue;
            }

            const v = valueValidator(value, params, params.lang.validation[lang], ...args);

            if (v === false) {
                break;
            }

            if (_.isObject(v)) {
                result.push(v);
            }
        }

        return result;
    };
}

export function translate(str, params) {
    return Object.entries(params).reduce(
        (str, [key, value]) => str.replaceAll(':' + key, value), str);
}

/**
 * Create matcher function for validator
 *
 * @param {Function|RegExp} matchFunc
 * @param {String} langNotOk
 * @param {String?} langOk
 * @return {function(*=, *=, *=): {isValid: boolean, messages: [*]|[]|[*]}}
 */
export function createMatcher(matchFunc, langNotOk, langOk) {
    return function (value, params, lang, ...args) {
        let langParams = {};

        const isValid = Boolean(_.isRegExp(matchFunc) ? String(value).match(matchFunc) : matchFunc(value, params, lang, langParams, ...args));

        return {
            isValid: isValid,
            messages: (isValid ? (langOk ? [translate(lang[langOk], langParams)] : []) : [translate(lang[langNotOk], langParams)]),
        };
    };
}

/**
 * Parse validation rules in string
 *
 * @param {String} validationRules
 * @return {Object}
 */
export function parseValidationRules(validationRules) {
    let tokens = [];

    const lex = new Flex();
    lex.setIgnoreCase(true);
    lex.addState('param', true);
    lex.addStateRule(Flex.STATE_INITIAL, /[a-z0-9_\-]+/
        , (lexer) => {
        tokens.push({
            id: 'rulename',
            value: lexer.text,
        });

        const inp = lexer.input();

        if (inp === ':') {
            lexer.begin('param');
        } else if (inp === '|') {
            lexer.begin(Flex.STATE_INITIAL);
        } else if (inp === '') {
            ;
        } else {
            throw new Error('Unexpected char: "' + inp + '"');
        }
    });
    lex.addStateRule('param', /[^,"'|]+/
    , (lexer) => {
            tokens.push({
                id: 'param',
                value: lexer.text,
            });

            const inp = lexer.input();

            if (inp === ',') {
                return;
            } else if (inp === '|') {
                lexer.begin(Flex.STATE_INITIAL);
            }
    });

    lex.addStateRule('param', /("|')/, (lexer) => {
        let char = '';
        let str = '';
        const quote = lexer.text;

        do {
            char = lexer.input();

            if (char === quote) {
                break;
            }

            if (char === '\\') {
                const esc = lexer.input();

                if (esc === '"') {
                    str += '"';
                } else if (esc === '\'') {
                    str += '\'';
                } else if (esc === 't') {
                    str += '\t';
                } else {
                    str += '\\';
                }

                continue;
            }

            str += char;

        } while (char !== '');

        tokens.push({
            id: "param",
            value: str,
        });

        if (lexer.input() !== ',') {
            lexer.terminate();
        }
    });

    lex.setSource(validationRules);
    lex.lex();

    let params = [];

    let result = [];

    for (const token of tokens.reverse()) {
        if (token.id === 'param') {
            params.push(token);
        } else {
            result.push({
                name: token.value,
                options: params.map((v) => v.value),
            });
            params = [];
        }
    }

    return result.reverse();
}

export function passwordStrengthEstimate(password) {
    let est = 0;

    if (password.length >= 8) {
        ++est;
    }

    if ((/[^a-zA-Z0-9]/).test(password)) {
        ++est;
    }

    if ((/[a-z]/).test(password) && (/[A-Z]/).test(password)) {
        ++est;
    }

    if ((/[0-9]/).test(password)) {
        ++est;
    }

    return est;
};
