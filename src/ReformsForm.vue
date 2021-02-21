<template>
  <form v-bind="$attrs">
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
  emits: ['update:modelValue', 'beforeValidation', 'validated'],
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
};
</script>
