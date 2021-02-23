<template>
  <div class="reforms-group-output card">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {watch, toRef} from 'vue';
import _ from 'lodash';

export default {
  name: 'ReformsGroupOutput',
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      container: {},
      containerWatchers: {},
    };
  },
  methods: {
    registerOutput(output) {
      this.container[output.name] = output;

      this.containerWatchers[output.name] = watch(toRef(this.$props, 'value'), (value) => {
        if (!_.isObject(value)) {
          return;
        }

        output.setValue(value[output.name]);
      }, {deep: true, immediate: true});
    },
    unregisterOutput(output) {
      this.container[output.name] = undefined;

      if (_.isFunction(this.containerWatchers[output.name])) {
        this.containerWatchers[output.name]();
      }
    }
  }
}
</script>
