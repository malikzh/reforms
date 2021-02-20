<template>
  <form>
    <slot v-bind="$attrs"></slot>
  </form>
</template>
<script>
import {toRef, watch} from 'vue';
import ReformsContainerMixin from "./ReformsContainerMixin";

export default {
  name: 'ReformsForm',
  inheritAttrs: false,
  mixins: [ReformsContainerMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      default: {},
    },
  },
  created() {
    const containerRef = toRef(this.$data, 'container');

    watch(containerRef, (container) => {
      this.$emit('update:modelValue', container);
    }, {deep: true});
  }
};
</script>
