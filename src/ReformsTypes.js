import ReformsStringInput from "./input/ReformsStringInput";
import ReformsStringOutput from "./output/ReformsStringOutput";
import ReformsGroupInput from "./input/ReformsGroupInput";
import ReformsGroupOutput from './output/ReformsGroupOutput';

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
        output: ReformsGroupOutput,
    },
}
