<template>
  <div class="reforms-input">
    <textarea ref="input"></textarea>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses} from "../Util";
const Jodit = require('jodit').Jodit;
import 'jodit/build/jodit.css';
import _ from 'lodash';
import {watch, toRef} from 'vue';

export default {
  name: "ReformsHtmlInput",
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
      editor: null,
      watcher: null,
      content: '',
    };
  },
  mounted() {
    this.editor = new Jodit(this.$refs.input);

    this.watcher = watch(toRef(this.$props, 'modelValue'), (modelValue) => {
      if (this.editor.value !== modelValue) {
        this.editor.value = (modelValue ? String(modelValue) : '');
      }
    }, {immediate: true});

    this.editor.events.on('change', newValue => {
      this.$emit('update:modelValue', newValue);
    });
  },
  beforeUnmount() {
    this.watcher();
    this.editor.destruct();
  }
}
</script>
<style scoped>
.reforms-input > div {
  min-height: 100px;
}
</style>
