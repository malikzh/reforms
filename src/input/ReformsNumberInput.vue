<template>
  <div class="reforms-input">
    <input
        type="number"
        v-model="inputValue"
        :id="id"
        :placeholder="placeholder"
        :readonly="readonly"
        class="form-control"
        :class="classes"
        :tabindex="tabindex"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :step="step"
    />
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue} from "../Util";

export default {
  name: "ReformsNumberInput",
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
    tabindex: String,
    autocomplete: String,
    min: String,
    max: String,
    step: String,
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
}
</script>
