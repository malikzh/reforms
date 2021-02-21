<template>
  <div>
    <div class="row mb-2">
      <div class="col-12 text-center mb-2">
        STRING
      </div>
      <div class="col-12 text-center mb-2">
        <b>(single)</b>
      </div>
      <div class="col-6">
        <reforms-input type="string" v-model="modelString" />
      </div>
      <div class="col-6">
        <reforms-output type="string" :value="modelString" />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-12 text-center mb-2">
        <b>(multiple)</b>
      </div>
      <div class="col-6">
        <reforms-input type="string" multiple sortable v-model="modelStringMultiple" />
      </div>
      <div class="col-6">
        <reforms-output type="string" :value="modelStringMultiple" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StringType",
  data() {
    return {
      modelString: 'test value',
      modelStringMultiple: [
        'test value',
        'test value 2',
      ],
    };
  },
};
</script>
