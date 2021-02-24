<template>
  <div class="reforms-radio-output">
    <span v-for="v in (Array.isArray(value) ? value : [])">
      {{ options[v] !== undefined ? options[v] : v }},&nbsp;
    </span>
  </div>
</template>
<script>
export default {
  name: "ReformsCheckboxOutput",
  props: {
    value: {
      type: Array,
      default: [],
    },
    options: {
      type: Object,
      default: {},
    }
  },
};
</script>
