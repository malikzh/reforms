<template>
  <div class="reforms-group-input card">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {toRef, watch} from 'vue';
import ReformsContainerMixin from "../ReformsContainerMixin";

export default {
  name: "ReformsGroupInput",
  mixins: [ReformsContainerMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      default: {},
    },
    validationResult: {
      type: Object,
      default: {},
    },
  },
  created() {
    const containerRef = toRef(this.$data, 'container');

    this.container = this.modelValue;

    watch(containerRef, (container) => {
      this.$emit('update:modelValue', container);
    }, {deep: true});
  },
  methods: {
    validate() {
      return false;
    },
  }
};
</script>
