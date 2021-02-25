<template>
  <div class="reforms-input">
    <input type="text" class="form-control reforms-date-input" @input="onInput" :class="classes" ref="input">
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue} from "../Util";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {watch, toRef} from 'vue';
import _ from 'lodash';

export default {
  name: "ReformsDateInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      default: '',
    },
    readonly: Boolean,
    placeholder: String,
    tabindex: String,
    autocomplete: String,
    config: {
      type: Object,
      default: {},
    }
  },
  computed: {
    classes() {
      return mergeClasses(this.inputClass, {
        'is-valid': this.isValid === true,
        'is-invalid': this.isValid === false,
      });
    },
  },
  data() {
    return {
      instance: null,
      watcher: null,
    };
  },
  mounted() {



    if (_.isString(this.config.locale)) {
      this.config.locale = require('flatpickr/dist/l10n/' + this.config.locale + '.js').default[this.config.locale];
    }

    this.instance = flatpickr(this.$refs.input, this.config);

    this.watcher = watch(toRef(this.$props, 'modelValue'), (value) => {
      this.instance.setDate(value);
    }, {immediate: true, deep: true,});
  },
  beforeUnmount() {
    this.instance && this.instance.destroy();
    this.watcher();
  },
  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>
<style>
.reforms-date-input {
  background-color: #fff !important;
}
</style>
