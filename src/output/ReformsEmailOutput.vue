<template>
  <div class="reforms-email-output">
    {{ value }} <a v-if="value && value.indexOf('@') > 0" style="text-decoration: none;" :href="'mailto:' + value">&#128231;</a>
  </div>
</template>
<script>
export default {
  name: "ReformsEmailOutput",
  props: {
    value: {
      type: String,
      default: '',
    }
  },
};
</script>
