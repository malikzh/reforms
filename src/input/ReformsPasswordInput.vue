<template>
  <div class="reforms-input">
    <input type="password"
           :name="name"
           :placeholder="placeholder"
           :readonly="readonly"
           :id="id"
           class="form-control"
           :class="classes"
           ref="input"
           :tabindex="tabindex"
           v-model="inputValue">
    <div class="reforms-password-strength" v-if="passwordStrength">
      <div class="progress">
        <div class="progress-bar"
             :class="{'bg-danger': strength === 1 || strength === 0, 'bg-warning': strength === 2, 'bg-info': strength === 3, 'bg-success': strength === 4,}"
             :style="{width: (strength / 4 * 100) + '%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue, passwordStrengthEstimate} from "../Util";

export default {
  name: "ReformsPasswordInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    readonly: Boolean,
    placeholder: String,
    tabindex: String,
    strengthEstimation: {
      type: Function,
      default: passwordStrengthEstimate,
    },
    passwordStrength: Boolean,
  },
  computed: {
    inputValue: modelValue(),
    classes() {
      return mergeClasses(this.inputClass, {
        'is-valid': this.isValid === true,
        'is-invalid': this.isValid === false,
      });
    },
    strength() {
      const val = String(this.modelValue);

      return Math.min(4, Math.max(val.length > 0 ? 1 : 0,
          Math.round(this.strengthEstimation(val))));
    },
  },
}
</script>
<style>
.reforms-password-strength {
  margin-top: 5px;
}

.reforms-password-strength > .progress {
    height: 5px;
}
</style>
