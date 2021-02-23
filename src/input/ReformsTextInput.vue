<template>
  <div class="reforms-input">
    <textarea
        v-model="inputValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        :id="id"
        class="form-control"
        :class="classes"
        :tabindex="tabindex"
        :autocomplete="autocomplete"
    ></textarea>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue} from "../Util";

export default {
  name: "ReformsTextInput",
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
    maxlength: String,
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
