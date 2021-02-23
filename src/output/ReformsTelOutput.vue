<template>
  <div class="reforms-email-output">
    {{ value }} <a v-if="value" style="text-decoration: none;" :href="'tel:' + value">&phone;</a>
  </div>
</template>
<script>
export default {
  name: "ReformsTelOutput",
  props: {
    value: {
      type: String,
      default: '',
    }
  },
};
</script>
