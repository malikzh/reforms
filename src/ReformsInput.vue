<template>
  <div class="reforms-input-container row mb-2" v-show="shown">
    <reforms-label v-bind="$attrs" />
    <div class="col">
      <div v-for="(input, i) in inputs" class="row align-items-start mb-2">
        <div class="col">
          <component :ref="(el) => {inputsList[i] = el;}" :is="inputComponent" :validation-result="inputValidation && inputValidation[i]" :is-valid="inputValidation && inputValidation[i] ? inputValidation[i].isValid : null" v-bind="$attrs" :name="name ? (name + (this.multiple ? ('[' + i + ']') : '')) : undefined" v-model="inputs[i].value" @update:model-value="updateValues">
            <slot></slot>
          </component>
          <div class="reforms-validation row mt-2" v-if="() => inputValidation[i] && _.isArray(inputValidation[i].messages) && inputValidation[i].messages.length > 0">
            <div class="col">
              <ul class="d-block" :class="{'valid-feedback': inputValidation[i] && inputValidation[i].isValid === true, 'invalid-feedback': inputValidation[i] && inputValidation[i].isValid === false,}">
                <li v-for="message in (inputValidation[i] ? inputValidation[i].messages : [])">
                  {{ message }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-auto" v-if="this.multiple" style="padding-top: 4px;">
          <div class="row g-1" style="min-width: 96px;">
            <div class="col-auto" style="min-width: 33px;" v-if="this.sortable">
              <button v-if="i > 0" @click.prevent="moveItemUp(i)" class="btn btn-sm btn-secondary">
                &uarr;
              </button>
            </div>
            <div class="col-auto" style="min-width: 33px;" v-if="this.sortable">
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
import mitt from 'mitt';
import ReformsLabel from "./ReformsLabel";
import langEn from './lang/ru' // todo change to en

export default {
  name: 'ReformsInput',
  components: {ReformsLabel},
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true,
      default: 'string',
    },
    modelValue: null,
    validation: [Array],
    language: {
      type: Object,
      default: langEn,
    },
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
      inputComponent: (() => {
        if (this.$reforms.types[this.type]) {
          return this.$reforms.types[this.type].input;
        } else {
          throw new Error('Undefined input type "' + this.type + '".');
        }
      })(),
      events: mitt(),
      inputValidation: [],
      validators: [],
      inputsList: {},
    };
  },
  setup(props) {
    let inputsRef;

    let inputs;

    if (props.multiple && _.isArray(props.modelValue)) {
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
      if (props.multiple && _.isArray(props.modelValue)) {
        if (modelValue.length > inputs.length) {
          const fullLength = (modelValue.length-inputs.length);
          for (let i=0; i<fullLength;++i) {
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
      const emitData = this.multiple ? values : values[0];
      this.$emit('update:modelValue', emitData);
      this.events.emit('out:modelValue', emitData);

    },
    resetValidation() {
      this.validationResult.splice(0, this.validationResult.length);
    },
    addItem() {
      this.resetValidation();
      this.inputs.push(ref(null));
      this.updateValues();
    },
    removeItem(index) {
      this.resetValidation();
      this.inputs.splice(index, 1);
      this.updateValues();
    },
    moveItemDown(i) {
      this.resetValidation();
      const tmp = this.inputs[i];
      this.inputs[i] = this.inputs[i+1];
      this.inputs[i+1] = tmp;
      this.updateValues();
    },
    moveItemUp(i) {
      this.resetValidation();
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
    validate() {
      let nestedResult = true;

      this.inputs.forEach((v, i) => {
        if (_.isFunction(this.inputsList[i].validate)) {
          nestedResult = this.inputsList[i].validate() && nestedResult;
        }
      });

      if (!_.isArray(this.validators)) {
        return true;
      }

      const values = this.inputs.map((v) => v.value);
      const value = this.multiple ? values : values[0];

      let params = {
        stop: false,
        field: this.name,
        multiple: this.multiple,
        type: this.type,
        value: value,
        lang: this.language,
        form: this.findParentContainer(),
      };

      let validationResultSuccess = [];
      let validationResultFail = [];

      const validationMerge = (a, b) => {
        b.forEach((v, i) => {
          if (i >= a.length) {
            a.push(v);
          } else {
            a[i].messages = _.uniq(a[i].messages.concat(v.messages));
          }
        });
      };

      for (let v of this.validators) {
        if (!_.isString(v.name) || !this.$reforms.validators[v.name]) {
          console.warn('Invalid validator name: ' + v.name);
          continue;
        }

        params.options = v.options;

        const validator = this.$reforms.validators[v.name]
            .bind(this.$reforms.validators);

        const validationResult = validator(params);

        if (_.isArray(validationResult)) {
          if (validationResult.reduce((acc, val) => val.isValid && acc, true)) {
            validationMerge(validationResultSuccess, validationResult);
          } else {
            validationMerge(validationResultFail, validationResult);
          }
        }

        if (params.stop) {
          break;
        }
      }

      if (validationResultFail.length < 1) {
        this.inputValidation = validationResultSuccess;
      } else {
        this.inputValidation = validationResultFail;
      }

      return validationResultFail.length < 1 && nestedResult;
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
  created() {
    this.events.on('in:modelValue', (value) => {
      this.inputs.splice(0, this.inputs.length);

      if (this.multiple && _.isArray(value)) {
        value.forEach((v) => {
          this.inputs.push(ref(v));
        });
      } else {
        this.inputs.push(ref(value));
      }

    });

    watch(toRef(this.$props, 'shown'), (shown) => {
      this.events.emit('out:shown', shown);
    });

    watch(toRef(this.$props, 'validationResult'), (validationResult) => {
      this.inputValidation = validationResult;
    }, {deep: true, immediate: true});

    watch(toRef(this.$props, 'validation'), (validation) => {
      this.validators = validation;
    }, {deep: true, immediate: true});
  },
  mounted() {
    if (this.ignored) {
      return;
    }

    const p = this.findParentContainer();

    if (!p) {
      return;
    }

    p.registerInput(this);
  },
  beforeUnmount() {
    if (this.ignored) {
      return;
    }

    const p = this.findParentContainer();

    if (!p) {
      return;
    }

    p.unregisterInput(this.name);
  }
};
</script>
