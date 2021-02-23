import ReformsStringInput from "./input/ReformsStringInput";
import ReformsStringOutput from "./output/ReformsStringOutput";
import ReformsGroupInput from "./input/ReformsGroupInput";
import ReformsGroupOutput from './output/ReformsGroupOutput';
import ReformsNumberInput from "./input/ReformsNumberInput";
import ReformsTextInput from "./input/ReformsTextInput";

//
// Reforms default components
//
export default {
    'group': {
        input: ReformsGroupInput,
        output: ReformsGroupOutput,
    },
    'string': {
        input: ReformsStringInput,
        output: ReformsStringOutput,
    },
    'number': {
        input: ReformsNumberInput,
        output: ReformsStringOutput,
    },
    'text': {
        input: ReformsTextInput,
        output: ReformsStringOutput,
    },
};
