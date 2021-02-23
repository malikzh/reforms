import ReformsStringInput from "./input/ReformsStringInput";
import ReformsStringOutput from "./output/ReformsStringOutput";
import ReformsGroupInput from "./input/ReformsGroupInput";
import ReformsGroupOutput from './output/ReformsGroupOutput';
import ReformsNumberInput from "./input/ReformsNumberInput";
import ReformsTextInput from "./input/ReformsTextInput";
import ReformsEmailInput from "./input/ReformsEmailInput";
import ReformsEmailOutput from "./output/ReformsEmailOutput";
import ReformsTelInput from "./input/ReformsTelInput";
import ReformsTelOutput from "./output/ReformsTelOutput";
import ReformsUrlInput from "./input/ReformsUrlInput";
import ReformsUrlOutput from "./output/ReformsUrlOutput";

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
    'email': {
        input: ReformsEmailInput,
        output: ReformsEmailOutput,
    },
    'tel': {
        input: ReformsTelInput,
        output: ReformsTelOutput,
    },
    'url': {
        input: ReformsUrlInput,
        output: ReformsUrlOutput,
    },
};
