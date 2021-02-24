<template>
  <div class="reforms-input">
    <div class="form-check" v-for="(option, i) in Object.entries(options)">
      <input type="checkbox" :name="name" class="form-check-input" :class="classes" :id="idPrefix + '_' + String(i)" v-model="inputValue" :value="option[0]">
      <label class="form-check-label" :for="idPrefix + '_' + String(i)">
        {{ option[1] }}
      </label>
    </div>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue, randomId} from "../Util";
import _ from 'lodash';

export default {
  name: "ReformsCheckboxInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    options: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      idPrefix: randomId(16),
    };
  },
  computed: {
    inputValue: modelValue(undefined, (v) => !_.isArray(v) ? [] : v),
    classes() {
      return mergeClasses(this.inputClass, {
        'is-valid': this.isValid === true,
        'is-invalid': this.isValid === false,
      });
    },
  },
}
</script>
