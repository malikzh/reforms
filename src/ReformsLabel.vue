<template>
  <div class="col-4" v-if="label">
    <label>
      {{ label }}
    </label>
  </div>
</template>
<script>
export default {
  name: "ReformsLabel",
  props: {
    label: String,
  },
};
</script>
