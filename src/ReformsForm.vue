<template>
  <form v-bind="$attrs" @submit="onSubmit">
    <reforms-schema v-bind="$attrs" :schema="schema" />
    <slot v-bind="$attrs"></slot>
  </form>
</template>
<script>
import {toRef, watch} from 'vue';
import ReformsContainerMixin from "./ReformsContainerMixin";
import ReformsSchema from "./ReformsSchema";

export default {
  name: 'ReformsForm',
  inheritAttrs: false,
  components: {ReformsSchema},
  mixins: [ReformsContainerMixin],
  emits: ['update:modelValue', 'beforeValidate', 'validated', 'validateFailed', 'validateSuccess', 'submit'],
  props: {
    modelValue: {
      default: {},
    },
    schema: {
      type: Object,
      default: null,
    },
    validationResult: {
      type: Object,
      default: {},
    },
  },
  created() {
    const containerRef = toRef(this.$data, 'container');

    watch(containerRef, (container) => {
      this.$emit('update:modelValue', container);
    }, {deep: true});
  },
  methods: {
    onSubmit(e) {
      this.$emit('beforeValidate', e);

      // validate all
      let result = true;
      Object.keys(this.containerInputs).forEach( (name) => {
        result = this.containerInputs[name].validate() && result;
      });

      // emit events
      this.$emit(result ? 'validateSuccess' : 'validateFailed', e);
      this.$emit('validated', e);
      this.$emit('submit', e);
    }
  }
};
</script>
