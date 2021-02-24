<template>
  <div class="reforms-radio-output">
    <template v-if="!Array.isArray(value)">
      {{ optionsValues[value] !== undefined ? optionsValues[value] : value }}
    </template>
    <template v-else>
      <span v-for="v in value">
      {{ optionsValues[v] !== undefined ? optionsValues[v] : v }},&nbsp;
    </span>
    </template>
  </div>
</template>
<script>
export default {
  name: "ReformsSelectOutput",
  props: {
    value: {
      type: [Array, String],
      default: [],
    },
    options: {
      type: Array,
      default: [],
    },
  },
  computed: {
    optionsValues() {
      let ret = {};

      this.options.forEach((opt) => {
        if (!opt.children) {
          ret[opt.value] = opt.label;
        } else {
          opt.children.forEach((opt) => {
            ret[opt.value] = opt.label;
          });
        }
      });

      console.log(ret);

      return ret;
    },
  }
};
</script>
