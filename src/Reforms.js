import _ from 'lodash';
import ReformsStringInput from "./input/ReformsStringInput";
import ReformsInput from "./ReformsInput";
import ReformsForm from "./ReformsForm";

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
            validators: {
                // todo create validators file
                required: (params) => {
                    console.log('cprt');
                    return [
                        {
                            isValid: true,
                            messages: [
                                'Поле не заполнено',
                            ],
                        }
                    ];
                },
                required2: (params) => {
                    console.log('cprt');
                    return [
                        {
                            isValid: false,
                            messages: [
                                'Поле заполнено',
                            ],
                        }
                    ];
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
        app.component(ReformsForm.name, ReformsForm);
    },
}
