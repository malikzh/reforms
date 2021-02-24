<template>
  <div class="reforms-bool-output">
    <span v-if="value === true" class="text-success">
      {{ trueLabel }}
    </span>
    <span v-else-if="value === false" class="text-danger">
      {{ falseLabel }}
    </span>
    <span v-else class="text-muted">
      {{ undefinedLabel }}
    </span>
  </div>
</template>
<script>
export default {
  name: "ReformsBooleanOutput",
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    trueLabel: {
      type: String,
      default: 'V'
    },
    falseLabel: {
      type: String,
      default: 'X'
    },
    undefinedLabel: {
      type: String,
      default: '?'
    },
  },
};
</script>
