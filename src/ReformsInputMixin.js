export default {
    props: {
        id: {
            type: String,
            default: undefined,
        },
        isValid: {
            default: null,
        },
        inputClass: [String, Object, Array],
        name: String,
    },
};
