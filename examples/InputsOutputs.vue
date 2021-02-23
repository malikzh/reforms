<template>
  <div>
    <string-type />
    <hr />
    <number-type />
  </div>
</template>
<script>
import StringType from "./types/StringType";
import NumberType from "./types/NumberType";
export default {
  name: "InputsOutputs",
  components: {NumberType, StringType},
}
</script>
