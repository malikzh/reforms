import _ from 'lodash';
import ReformsStringInput from "./input/ReformsStringInput";
import ReformsInput from "./ReformsInput";

// Reforms default components need to register in Vue
const defaultComponents = {
    'string': ReformsStringInput,
};

// Plugin main initializer
export default {
    /**
     * Initialize reforms vue plugin
     *
     * @param {Object} app
     * @param {Object?} options
     */
    install(app, options) {
        const $reforms = {
            types: {
                'string': {
                    input: ReformsStringInput.name,
                    output: null, // todo
                }
            },
        };


        if (_.isObject(options) && _.isObject(options.types)) {
            options.types.keys().forEach((k) => !void($reforms.types[k] = options.types[k]));
        }

        for (const [name, component] of Object.entries(defaultComponents)) {
            app.component(component.name, component);
        }

        // Register system properties and components
        app.config.globalProperties.$reforms = $reforms;

        app.component(ReformsInput.name, ReformsInput);
    },
}
