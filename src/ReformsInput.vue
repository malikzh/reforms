<template>
  <div class="reforms-input-container row" v-show="shown">
    <div class="col-7">
      <div v-for="(input, i) in inputs" class="row align-items-center mb-2">
        <div class="col">
          <component :is="inputComponent" v-bind="$attrs" :name="name + (this.multiple ? '[]' : '')" v-model="inputs[i].value" @update:model-value="updateValues"></component>
        </div>
        <div class="col-auto" v-if="this.sortable">
          <div class="row g-1" style="min-width: 96px;">
            <div class="col-auto" style="min-width: 33px;">
              <button v-if="i > 0" @click.prevent="moveItemUp(i)" class="btn btn-sm btn-secondary">
                &uarr;
              </button>
            </div>
            <div class="col-auto" style="min-width: 33px;">
              <button v-if="i < inputs.length-1" @click.prevent="moveItemDown(i)" class="btn btn-sm btn-secondary">
                &darr;
              </button>
            </div>
            <div class="col-auto" style="min-width: 33px;">
              <button v-if="inputs.length > multipleMin" @click.prevent="removeItem(i)" class="btn btn-sm btn-danger">
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="multiple && (multipleMax < 1 || inputs.length < multipleMax)">
        <div class="col-12 text-center">
          <button @click.prevent="addItem()" class="btn btn-info">+</button>
        </div>
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
    multiple: [Boolean, Object],
    sortable: Boolean,
    ignored: Boolean,
    name: String,
    shown: {
      type: Boolean,
      default: true,
    }
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

    if (_.isObject(props.multiple) && _.isNumber(props.multiple.min) && props.multiple.min > 0) {
      const len = props.multiple.min-inputs.length;
      for (let i=0; i<len; ++i) {
        inputs.push(ref(null));
      }
    }

    if (inputs.length === 0) {
      inputs.push(ref(null));
    }

    watch(inputsRef, (modelValue) => {
      if (_.isArray(props.modelValue)) {
        if (modelValue.length > inputs.length) {
          for (let i=0; i<(modelValue.length-inputs.length);++i) {
            inputs.push(ref(null));
          }
        } else if (modelValue.length < inputs.length) {
          const fullLength = (inputs.length-modelValue.length);
          for (let i=0; i<fullLength; ++i) {
            inputs.pop();
          }
        }

        for (let i=0; i<modelValue.length; ++i) {
          inputs[i].value = modelValue[i];
        }

        if (_.isObject(props.multiple) && _.isNumber(props.multiple.min) && props.multiple.min > 0) {
          const len = props.multiple.min-inputs.length;
          for (let i=0; i<len; ++i) {
            inputs.push(ref(null));
          }
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
    addItem() {
      this.inputs.push(ref(null));
      this.updateValues();
    },
    removeItem(index) {
      this.inputs.splice(index, 1);
      this.updateValues();
    },
    moveItemDown(i) {
      const tmp = this.inputs[i];
      this.inputs[i] = this.inputs[i+1];
      this.inputs[i+1] = tmp;
      this.updateValues();
    },
    moveItemUp(i) {
      const tmp = this.inputs[i];
      this.inputs[i] = this.inputs[i-1];
      this.inputs[i-1] = tmp;
      this.updateValues();
    },
    findParentContainer() {
      let p = this.$parent;

      while (p && !_.isFunction(p.registerInput)) {
        p = p.$parent;
      }

      return p;
    },
  },
  computed: {
    multipleMax() {
      return _.isObject(this.multiple)
          && _.isNumber(this.multiple.max) && this.multiple.max > 0
          ? this.multiple.max : 0;
    },
    multipleMin() {
      return _.isObject(this.multiple)
      && _.isNumber(this.multiple.min) && this.multiple.min > 0
          ? this.multiple.min : 1;
    }
  },
  mounted() {
    const p = this.findParentContainer();

    if (!p) {
      return;
    }

    p.registerInput(this);
  },
  beforeUnmount() {
    const p = this.findParentContainer();

    if (!p) {
      return;
    }

    p.unregisterInput(this.name);
  }
};
</script>
