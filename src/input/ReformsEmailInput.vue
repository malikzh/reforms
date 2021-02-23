<template>
  <div class="reforms-input">
    <input type="email"
           :placeholder="placeholder"
           :readonly="readonly"
           :maxlength="maxlength"
           :id="id"
           class="form-control"
           :class="classes"
           :tabindex="tabindex"
           :autocomplete="autocomplete"
           v-model="inputValue">
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {modelValue, mergeClasses} from '../Util'

export default {
  name: "ReformsEmailInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    readonly: Boolean,
    placeholder: String,
    maxlength: String,
    tabindex: String,
    autocomplete: String,
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
