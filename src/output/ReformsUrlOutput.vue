<template>
  <div class="reforms-email-output">
    <a v-if="value" :href="value" target="_blank">
      {{ value }}
    </a>
  </div>
</template>
<script>
export default {
  name: "ReformsUrlOutput",
  props: {
    value: {
      type: String,
      default: '',
    }
  },
};
</script>
