import {toRef, watch} from 'vue';
import _ from 'lodash';

export default {
    data() {
        return {
            containerInputs: {},
            container: {},
            containerWatchers: {},
            containerListeners: {},
        };
    },
    methods: {
        registerInput(input) {
            this.containerListeners[input.name] = {
                modelValue: (modelValue) => {
                    if (!input.$props.shown) {
                        this.container[input.name] = undefined;
                        return
                    }

                    this.container[input.name] = modelValue;
                },
                shown: (shown) => {
                    if (!shown) {
                        this.container[input.name] = undefined;
                    } else {
                        input.updateValues();
                    }
                },
            }

            input.events.on('out:modelValue', this.containerListeners[input.name].modelValue);
            input.events.on('out:shown', this.containerListeners[input.name].shown);

            this.containerWatchers[input.name] = {
                containerWatch: watch(toRef(this.container, input.name), (value) => {
                    if (!input.$props.shown) {
                        return;
                    }

                    input.events.emit('in:modelValue', value);
                }, {deep: true, immediate: true}),
                validationWatch: watch(toRef(this.$props, 'validationResult'), (validationResult) => {
                    if (_.isArray(validationResult[input.name])) {
                        input.inputValidation = validationResult[input.name];
                    }
                }, {deep: true, immediate: true}),
                validatorsWatch: watch(toRef(this.$props, 'validation'), (validation) => {
                    if (_.isArray(validation)) {
                        input.validators = validation;
                    }
                }, {deep: true, immediate: true}),
            };

            this.containerInputs[input.name] = input;
        },
        unregisterInput(name) {
            if (!this.container[name]) {
                return;
            }

            this.container[name] = undefined;
            this.containerWatchers[name].containerWatch();
            this.containerWatchers[name].validationWatch();
            this.containerWatchers[name].validatorsWatch();
            this.containerWatchers[name] = undefined;
            this.containerInputs[name].events.off('out:modelValue', this.containerListeners[name].modelValue);
            this.containerInputs[name].events.off('out:shown', this.containerListeners[name].shown);
            this.containerInputs[name] = undefined;
            this.containerListeners[name] = undefined;
        }
    },
};
