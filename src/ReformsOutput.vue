<template>
  <div class="reforms-output-container row mb-2" v-show="shown">
    <reforms-label v-bind="$attrs" />
    <div class="col">
      <div class="row align-items-center mb-2" v-for="(output, i) in outputs">
        <div class="col">
          <component :is="outputComponent" v-bind="$attrs" :value="outputs[i]">
            <slot></slot>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {watch, toRef} from 'vue';
import _ from 'lodash';
import ReformsLabel from "./ReformsLabel";

export default {
  name: "ReformsOutput",
  components: {
    ReformsLabel,
  },
  props: {
    type: {
      type: String,
      default: 'string',
    },
    value: null,
    shown: {
      type: Boolean,
      default: true,
    },
    name: String,
    multiple: Boolean,
  },
  data() {
    return {
      outputComponent: this.$reforms.types[this.type].output,
      outputs: [],
      outputValue: null,
    };
  },
  created() {
    watch([toRef(this.$props, 'value'), toRef(this.$data, 'outputValue')], ([value1, value2]) => {
      let value = value1 || value2;

      this.outputs.splice(0, this.outputs.length);

      if (this.multiple && _.isArray(value)) {
        value.forEach((v) => {
          this.outputs.push(v);
        });
      } else {
        this.outputs.push(value);
      }
    }, {deep: true, immediate: true});
  },
  mounted() {
    const p = this.findParentContainer();

    if (!p) {
      return;
    }

    p.registerOutput(this);
  },
  beforeUnmount() {
    const p = this.findParentContainer();

    if (!p) {
      return;
    }

    p.unregisterOutput(this);
  },
  methods: {
    findParentContainer() {
      let p = this.$parent;

      while (p && !_.isFunction(p.registerOutput)) {
        p = p.$parent;
      }

      return p;
    },
    setValue(value) {
      this.outputValue = value;
    }
  }
};
</script>
