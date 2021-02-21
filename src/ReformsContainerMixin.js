import {toRef, watch} from 'vue';

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
            this.containerListeners[input.name] = (modelValue) => {
                if (!input.$props.shown) {
                    this.container[input.name] = undefined;
                    return
                }

                this.container[input.name] = modelValue;
            };

            input.events.on('out:modelValue', this.containerListeners[input.name]);
            input.events.on('out:shown', (shown) => {
                if (!shown) {
                    this.container[input.name] = undefined;
                } else {
                    input.updateValues();
                }
            });

            this.containerWatchers[input.name] = watch(toRef(this.container, input.name), (value) => {
                if (!input.$props.shown) {
                    return;
                }

                input.events.emit('in:modelValue', value);
            }, {deep: true});

            this.containerInputs[input.name] = input;
        },
        unregisterInput(name) {
            this.container[name] = undefined;
            this.containerWatchers[name]();
            this.containerWatchers[name] = undefined;
            this.containerInputs[name].events.off('out:modelValue', this.containerListeners[name]);
            this.containerInputs[name] = undefined;
            this.containerListeners[name] = undefined;
        }
    },
};
