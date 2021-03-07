import _ from 'lodash';

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
