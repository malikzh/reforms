<template>
  <div v-html="value"></div>
</template>
<script>
import {watch, toRef} from 'vue';

export default {
  name: "ReformsHtmlOutput",
  props: {
    value: {
      type: String,
      default: '',
    }
  },
};
</script>
