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
        <reforms-input type="string" hint="Some hint text" label="Input label" v-model="modelString" />
      </div>
      <div class="col-6">
        <reforms-output type="string" label="Input label"  :value="modelString" />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-12 text-center mb-2">
        <b>(multiple)</b>
      </div>
      <div class="col-6">
        <reforms-input type="string"  label="Input label 2"  multiple sortable v-model="modelStringMultiple" />
      </div>
      <div class="col-6">
        <reforms-output type="string" label="Input label 2" multiple :value="modelStringMultiple" />
      </div>
      <reforms-form @submit.stop="() => {}">
        <reforms-input name="keks1" label="kekus1" />
        <reforms-input name="keks2" validation="confirmation:keks1" label="kekus2" />
        <button type="submit">submittt</button>
      </reforms-form>
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
