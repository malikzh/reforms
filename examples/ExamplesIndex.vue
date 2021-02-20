<template>
  <div>
    <reforms-form v-model="val" bara="bere" :schema="schema">
<!--      <reforms-input v-if="val.test === 'bere'" type="string" name="testy"/>-->
    </reforms-form>
    <button @click.prevent="showValues">
      Show values
    </button>
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
      schema: {
        user: {
          type: 'string',
          attrs: {
            multiple: true
          },
          showIf(values) {
            console.log('uslovie', values.test);
            return values.test === 'ert';
          }
        },
        test: {
          type: 'string',
          attrs: {}
        },
      },
    }
  },
  methods: {
    showValues() {
      console.log('bee', this.val.user[0]);
    }
  }
};
</script>
