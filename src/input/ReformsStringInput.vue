<template>
  <div class="reforms-input">
    <input type="text"
           :name="name"
           :placeholder="placeholder"
           :readonly="readonly"
           :maxlength="maxlength"
           :id="id"
           class="form-control"
           :class="classes"
           ref="input"
           :tabindex="tabindex"
           :autocomplete="autocomplete"
           v-model="inputValue">
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {modelValue, mergeClasses} from '../Util'
import Inputmask from 'inputmask';

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
    mask: {
      type: [String, Object],
      default: null,
    },
    maskOptions: {
      type: Object,
      default: {},
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
  mounted() {
    if (this.mask) {
      const mask = new Inputmask(this.mask, this.maskOptions);
      mask.mask(this.$refs.input);
    }
  }
};
</script>
