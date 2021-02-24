<template>
  <div class="reforms-input">
    <select class="form-select" :name="name" :multiple="multiselect" :placeholder="placeholder" :class="classes" v-model="inputValue" :id="id">
      <template v-for="opt in options">
        <template v-if="opt.children">
          <optgroup :label="opt.label" :disabled="opt.disabled">
            <option v-for="opt2 in opt.children" :value="opt2.value" :disabled="opt2.disabled">{{ opt2.label }}</option>
          </optgroup>
        </template>
        <template v-else>
          <option :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</option>
        </template>
      </template>
    </select>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue} from "../Util";

export default {
  name: "ReformsSelectInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Array],
      default: undefined,
    },
    multiselect: Boolean,
    placeholder: String,
    options: {
      type: Array,
      default: [],
    },
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
