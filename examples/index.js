import {createApp} from 'vue';
import ExamplesIndex from './ExamplesIndex'
import Reforms from "../src/Reforms";

// Initialize bootstrap 5
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(ExamplesIndex);
app.use(Reforms);
app.mount('#app');
