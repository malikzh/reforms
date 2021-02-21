<template>
  <div>
    <reforms-input :validation="[{name: 'required'}, {name: 'required2'}]" ref="dff"/>
    <reforms-form :validation-result="valid" v-model="val" bara="bere" :schema="schema" @submit.prevent="onSubmit">
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
            //console.log('uslovie', values.test);
            return values.test === 'ert';
          }
        },
        test: {
          type: 'string',
          attrs: {}
        },
      },
      valid: {
        test: [
          {
            isValid: true,
            messages: [
              'kek',
              'cheburek',
            ],
          },
        ],
      },
    };
  },
  methods: {
    showValues() {
      console.log('test', this.val.user[0]);
      console.log(this.val.user);
      this.val.user[0] = 'dfgh555';
    },
    onSubmit() {
      console.log('submitted!');
    }
  },
  mounted() {
    this.$refs.dff.validate();
  }
};
</script>
