<template>
  <div>
    <reforms-input type="string" name="testy" :multiple="{min: 3, max: 5}" sortable v-model="val" />
  </div>
</template>
<script>
import ReformsInput from "../src/ReformsInput";
export default {
  name: "ExamplesIndex",
  components: {ReformsInput},
  data() {
    return {
      val: ['d', 'b'],
    }
  },
};
</script>
