<template>
  <div class="reforms-output-container row mb-2" v-show="shown">
    <div class="col-7">
      <div class="row align-items-center mb-2" v-for="(output, i) in outputs">
        <div class="col">
          <component :is="outputComponent" v-bind="$attrs" :value="outputs[i]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {watch, toRef} from 'vue';
import _ from 'lodash';

export default {
  name: "ReformsOutput",
  props: {
    type: {
      type: String,
      default: 'string',
    },
    modelValue: null,
    shown: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      outputComponent: this.$reforms.types[this.type].output,
      outputs: [],
    };
  },
  created() {
    watch(toRef(this.$props, 'modelValue'), (modelValue) => {
      this.outputs.splice(0, this.outputs.length);

      if (_.isArray(modelValue)) {
        modelValue.forEach((v) => {
          this.outputs.push(v);
        });
      } else {
        this.outputs.push(modelValue);
      }
    }, {deep: true, immediate: true});
  },
};
</script>
