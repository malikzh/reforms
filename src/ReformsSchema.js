import {h, toRefs, reactive} from 'vue';
import _ from 'lodash';
import ReformsInput from "./ReformsInput";

function renderTree(schema, component, output) {
    let ret = [];

    for (const key of Object.keys(schema)) {
        if (!_.isString(schema[key].type)) {
            console.warn('Invalid parameter `type` in schema field: ' + key);
            continue;
        }

        const attrs = _.isObject(schema[key].attrs) ? schema[key].attrs : {};

        let props = reactive({
            ...toRefs(component.$attrs),
            ...attrs,
            type: schema[key].type,
            name: key,
        });

        if (!(!_.isFunction(schema[key].showIf)
            || (_.isFunction(schema[key].showIf)
                && schema[key].showIf(component.$parent.container)))) {
            props.shown = false;
        }

        ret.push(h(ReformsInput, props, _.isObject(schema[key].children)
            ? renderTree(schema[key].children, component, output)
            : undefined));
    }

    return ret;
}


export default {
    name: 'ReformsSchema',
    props: {
        schema: {
            type: Object,
            default: null,
        },
        outputMode: Boolean,
    },
    render() {
        if (!this.schema) {
            return;
        }

        return renderTree(this.schema, this, this.outputMode);
    }
};