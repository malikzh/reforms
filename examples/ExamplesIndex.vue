<template>
  <div>
    <reforms-form v-model="val">
      <reforms-input v-if="kek" type="string" name="testy"/>
    </reforms-form>
  </div>
</template>
<script>
import ReformsInput from "../src/ReformsInput";
import ReformsForm from "../src/ReformsForm";
export default {
  name: "ExamplesIndex",
  components: {ReformsForm, ReformsInput},
  data() {
    return {
      val: {},
      kek: true,
    }
  },
};
</script>
