<template>
  <div class="reforms-radio-output">
    {{ options[value] !== undefined ? options[value] : value }}
  </div>
</template>
<script>
export default {
  name: "ReformsRadioOutput",
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: {},
    }
  },
};
</script>
