import ReformsStringInput from "./input/ReformsStringInput";
import ReformsStringOutput from "./output/ReformsStringOutput";
import ReformsGroupInput from "./input/ReformsGroupInput";

//
// Reforms default components
//
export default {
    'string': {
        input: ReformsStringInput,
        output: ReformsStringOutput,
    },
    'group': {
        input: ReformsGroupInput,
        output: null, //todo
    },
}
