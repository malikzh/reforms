<template>
  <div class="col-4" v-if="label">
    <label>
      {{ label }}
      <a href="javascript:void(0);" v-if="hint" style="text-decoration: none;"
         class="text-success" data-bs-toggle="tooltip"
         :title="hint" ref="hint">
        &#9432;
      </a>
    </label>
  </div>
</template>
<script>
import {Tooltip} from 'bootstrap'

export default {
  name: "ReformsLabel",
  props: {
    label: String,
    hint: String,
  },
  mounted() {
    if (this.hint) {
      new Tooltip(this.$refs.hint);
    }
  },
};
</script>
