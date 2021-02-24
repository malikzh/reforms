<template>
  <div class="reforms-input">
    <div class="form-check form-switch">
      <input type="checkbox" :name="name" class="form-check-input" :class="classes" :id="id" v-model="inputValue">
    </div>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue, randomId} from "../Util";

export default {
  name: "ReformsBooleanInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      idPrefix: randomId(16),
    };
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
