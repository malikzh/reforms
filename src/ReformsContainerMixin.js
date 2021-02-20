import {watch} from 'vue';

export default {
    data() {
        return {
            container: {},
        };
    },
    methods: {
        registerInput(input) {
            this.container[input.name] = null;

            watch(input.inputs, (val) => {
                this.container[input.name] = input.multiple ? val.map((v) => v.value) : val[0].value;
            }, {deep: true});
        },
        unregisterInput(name) {
            this.container[name] = undefined;
        }
    },
};
