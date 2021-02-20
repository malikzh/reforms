import _ from 'lodash';

/**
 * Create getter & setter for v-model value
 *
 * @param {String?} propName v-model Property name
 * @returns {{set(*=): void, get(): *}|*}
 */
export function modelValue(propName) {
    propName = propName || 'modelValue';

    return {
        get() {
            return this[propName];
        },
        set(value) {
            this.$emit('update:' + propName, value);
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
