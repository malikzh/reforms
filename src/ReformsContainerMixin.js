export default {
    data() {
        return {
            container: {},
        };
    },
    methods: {
        registerInput(input) {
            this.container[input.name] = input.multiple ? input.inputs :  input.inputs[0];
        },
        unregisterInput(name) {
            this.container[name] = undefined;
        }
    },
};
