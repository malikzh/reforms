<template>
  <div class="reforms-string-output">
    {{ value }}
  </div>
</template>
<script>
export default {
  name: "ReformsStringOutput",
  props: {
    value: {
      type: String,
      default: '',
    }
  },
};
</script>
