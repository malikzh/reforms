<template>
  <form v-bind="$attrs" @submit="onSubmit">
    <reforms-schema v-bind="$attrs" :schema="schema" />
    <slot v-bind="$attrs"></slot>
    <div class="row">
      <div class="col">
        <div class="spinner-border spinner-border-sm text-info" role="status" v-if="formLoadingMode">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import {toRef, watch} from 'vue';
import ReformsContainerMixin from "./ReformsContainerMixin";
import ReformsSchema from "./ReformsSchema";

export default {
  name: 'ReformsForm',
  inheritAttrs: false,
  components: {ReformsSchema},
  mixins: [ReformsContainerMixin],
  emits: ['update:modelValue', 'beforeValidate', 'validated', 'validateFailed', 'validateSuccess', 'submit'],
  props: {
    modelValue: {
      default: {},
    },
    schema: {
      type: Object,
      default: null,
    },
    validationResult: {
      type: Object,
      default: {},
    },
    needValidation: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      formLoadingMode: false,
    };
  },
  created() {
    const containerRef = toRef(this.$data, 'container');

    watch(containerRef, (container) => {
      this.$emit('update:modelValue', container);
    }, {deep: true});
  },
  methods: {
    onSubmit(e) {
      if (this.formLoadingMode) {
        e.preventDefault();
        return;
      }

      if (this.needValidation) {
        this.$emit('beforeValidate', e);

        // validate all
        const result = this.validate();

        // emit events
        if (!result) {
          e.preventDefault();
        }

        this.$emit(result ? 'validateSuccess' : 'validateFailed', e);
        this.$emit('validated', e);

        if (result) {
          this.$emit('submit', e);
        }
      } else {
        this.$emit('submit', e);
      }
    },
    validate() {
      let result = true;
      Object.keys(this.containerInputs).forEach( (name) => {
        result = this.containerInputs[name].validate() && result;
      });

      return result;
    }
  }
};
</script>
