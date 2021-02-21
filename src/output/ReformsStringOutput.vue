<template>
  <div>value is: {{ value }}</div>
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
