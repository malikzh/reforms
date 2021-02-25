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
import ReformsHiddenInput from "./input/ReformsHiddenInput";
import ReformsHiddenOutput from "./output/ReformsHiddenOutput";
import ReformsRadioInput from "./input/ReformsRadioInput";
import ReformsRadioOutput from "./output/ReformsRadioOutput";
import ReformsCheckboxInput from "./input/ReformsCheckboxInput";
import ReformsCheckboxOutput from "./output/ReformsCheckboxOutput";
import ReformsBooleanInput from "./input/ReformsBooleanInput";
import ReformsBooleanOutput from "./output/ReformsBooleanOutput";
import ReformsSelectInput from "./input/ReformsSelectInput";
import ReformsSelectOutput from "./output/ReformsSelectOutput";
import ReformsDateInput from "./input/ReformsDateInput";

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
    'hidden': {
        input: ReformsHiddenInput,
        output: ReformsHiddenOutput,
    },
    'radio': {
        input: ReformsRadioInput,
        output: ReformsRadioOutput,
    },
    'checkbox': {
        input: ReformsCheckboxInput,
        output: ReformsCheckboxOutput,
    },
    'bool': {
        input: ReformsBooleanInput,
        output: ReformsBooleanOutput,
    },
    'select': {
        input: ReformsSelectInput,
        output: ReformsSelectOutput,
    },
    'datetime': {
        input: ReformsDateInput,
        output: ReformsStringOutput,
    },
};
