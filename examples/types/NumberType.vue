<template>
  <div>
    <div class="row mb-2">
      <div class="col-6">
        <reforms-input type="number" v-model="value" />
      </div>
      <div class="col-6">
        <reforms-output type="number" :value="value" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NumberType",
  data() {
    return {
      value: '32',
    };
  },
}
</script>
