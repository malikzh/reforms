<template>
  <div class="reforms-card row">
    <reforms-schema :schema="schema" output-mode v-bind="$attrs" :value="value" />
  </div>
</template>
<script>
import ReformsSchema from "./ReformsSchema";
import ReformsContainerMixin from "./ReformsContainerMixin";
export default {
  name: "ReformsCard",
  mixins: [ReformsContainerMixin],
  components: {
    ReformsSchema,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      default: {},
    },
  }
};
</script>
