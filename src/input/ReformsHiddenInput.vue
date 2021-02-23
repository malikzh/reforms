<template>
  <div class="reforms-input">
    <input type="hidden" :name="name || ''" :id="id" :class="inputClass" v-model="inputValue">
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {modelValue} from "../Util";

export default {
  name: "SET",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputValue: modelValue(),
  },
}
</script>
