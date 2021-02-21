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
    value: null,
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
    watch(toRef(this.$props, 'value'), (value) => {
      this.outputs.splice(0, this.outputs.length);

      if (_.isArray(value)) {
        value.forEach((v) => {
          this.outputs.push(v);
        });
      } else {
        this.outputs.push(value);
      }
    }, {deep: true, immediate: true});
  },
};
</script>
