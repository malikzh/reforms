import ReformsStringInput from "./input/ReformsStringInput.vue";
import ReformsStringOutput from "./output/ReformsStringOutput.vue";
import ReformsGroupInput from "./input/ReformsGroupInput.vue";
import ReformsGroupOutput from './output/ReformsGroupOutput.vue';
import ReformsNumberInput from "./input/ReformsNumberInput.vue";
import ReformsTextInput from "./input/ReformsTextInput.vue";
import ReformsEmailInput from "./input/ReformsEmailInput.vue";
import ReformsEmailOutput from "./output/ReformsEmailOutput.vue";
import ReformsTelInput from "./input/ReformsTelInput.vue";
import ReformsTelOutput from "./output/ReformsTelOutput.vue";
import ReformsUrlInput from "./input/ReformsUrlInput.vue";
import ReformsUrlOutput from "./output/ReformsUrlOutput.vue";
import ReformsHiddenInput from "./input/ReformsHiddenInput.vue";
import ReformsHiddenOutput from "./output/ReformsHiddenOutput.vue";
import ReformsRadioInput from "./input/ReformsRadioInput.vue";
import ReformsRadioOutput from "./output/ReformsRadioOutput.vue";
import ReformsCheckboxInput from "./input/ReformsCheckboxInput.vue";
import ReformsCheckboxOutput from "./output/ReformsCheckboxOutput.vue";
import ReformsBooleanInput from "./input/ReformsBooleanInput.vue";
import ReformsBooleanOutput from "./output/ReformsBooleanOutput.vue";
import ReformsSelectInput from "./input/ReformsSelectInput.vue";
import ReformsSelectOutput from "./output/ReformsSelectOutput.vue";
import ReformsDateInput from "./input/ReformsDateInput.vue";
import ReformsHtmlInput from "./input/ReformsHtmlInput.vue";
import ReformsHtmlOutput from "./output/ReformsHtmlOutput.vue";
import ReformsFileInput from "./input/ReformsFileInput.vue";
import ReformsFileOutput from "./output/ReformsFileOutput.vue";
import ReformsPasswordInput from "./input/ReformsPasswordInput.vue";
import ReformsPasswordOutput from "./output/ReformsPasswordOutput.vue";

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
    'html': {
        input: ReformsHtmlInput,
        output: ReformsHtmlOutput,
    },
    'file': {
        input: ReformsFileInput,
        output: ReformsFileOutput,
    },
    'password': {
        input: ReformsPasswordInput,
        output: ReformsPasswordOutput,
    },
};
