import _ from 'lodash';
import ReformsInput from "./ReformsInput";
import ReformsOutput from "./ReformsOutput";
import ReformsForm from "./ReformsForm";
import ReformsCard from "./ReformsCard";
import ReformsTypes from "./ReformsTypes";
import ReformsValidators from './ReformsValidators';

// Inputs
import ReformsStringInput from "./input/ReformsStringInput";

// Outputs
import ReformsStringOutput from "./output/ReformsStringOutput";

// Plugin main initializer
export default {
    /**
     * Initialize reforms vue plugin
     *
     * @param {Object} app
     * @param {Object?} options
     */
    install(app, options) {
        let types = {};

        Object.keys(ReformsTypes).forEach((key) => {
            types[key] = {
                input: ReformsTypes[key].input ? ReformsTypes[key].input.name : null,
                output: ReformsTypes[key].output ? ReformsTypes[key].output.name : null,
            };
        });

        const $reforms = {
            types: types,
            validators: ReformsValidators,
        };


        if (_.isObject(options) && _.isObject(options.types)) {
            options.types.keys().forEach((k) => !void($reforms.types[k] = options.types[k]));
        }

        let registeredInputs = [];
        let registeredOutputs = [];

        for (const v of Object.values(ReformsTypes)) {
            if (v.input && registeredInputs.indexOf(v.input) === -1) {
                app.component(v.input.name, v.input);
                registeredInputs.push(v.input);
            }

            if (v.output && registeredOutputs.indexOf(v.output) === -1) {
                app.component(v.output.name, v.output);
                registeredOutputs.push(v.output);
            }
        }

        // Register system properties and components
        app.config.globalProperties.$reforms = $reforms;

        app.component(ReformsInput.name, ReformsInput);
        app.component(ReformsForm.name, ReformsForm);
        app.component(ReformsOutput.name, ReformsOutput);
        app.component(ReformsCard.name, ReformsCard);
    },
}
