<template>
  <div class="reforms-input">
    <input type="text" :placeholder="placeholder" :id="id" class="form-control" :class="classes" ref="input" v-model="inputValue">
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {modelValue, mergeClasses} from '../Util'

export default {
  name: "ReformsStringInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: String,
  },
  computed: {
    inputValue: modelValue(),
    classes() {
      return mergeClasses(this.inputClass, {
        'is-valid': this.isValid === true,
        'is-invalid': this.isValid === false,
      });
    },
  },
};
</script>
