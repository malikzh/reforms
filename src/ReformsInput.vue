<template>
  <div class="reforms-input-container row">
    <div class="col-7">
      <div v-for="(input, i) in inputs">
        <component :is="inputComponent" v-model="inputs[i].value" @update:model-value="updateValues"></component>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import {reactive, ref, watch, toRef} from 'vue';

export default {
  name: 'ReformsInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true,
      default: 'string',
    },
    modelValue: null,
    validation: [Array, String],
    validationResult: {
      type: Array,
      default: [],
    },
    multiple: Boolean,
    sortable: Boolean,
    ignored: Boolean,
    name: String,
  },
  emits: ['update:modelValue', 'validated', 'beforeValidate'],
  data() {
    return {
      inputComponent: this.$reforms.types[this.type].input,
    };
  },
  setup(props) {
    let inputsRef;

    let inputs;

    if (_.isArray(props.modelValue)) {
      inputsRef = toRef(props, 'modelValue');
      inputs = reactive(inputsRef.value.map((v) => ref(v)));
    } else {
      inputsRef = toRef(props, 'modelValue');
      inputs = reactive([ref(props.modelValue)]);
    }

    watch(inputsRef, (modelValue) => {
      if (_.isArray(props.modelValue)) {
        if (modelValue.length > inputs.length) {
          for (let i=0; i<(modelValue.length-inputs.length);++i) {
            inputs.push(ref(null));
          }
        } else if (modelValue.length < inputs.length) {
          inputs.splice(-1, inputs.length-modelValue.length);
        }
        for (let i=0; i<modelValue.length; ++i) {
          inputs[i].value = modelValue[i];
        }
      } else {
        if (inputs.length !== 1) {
          inputs.splice(0, inputs.length);
          inputs.push(ref(null));
        }

        inputs[0].value = modelValue;
      }
    }, {deep: true});

    return {inputs};
  },
  methods: {
    updateValues() {
      const values = this.inputs.map((v) => v.value);
      this.$emit('update:modelValue', this.multiple ? values : values[0]);
    },
  },
};
</script>
