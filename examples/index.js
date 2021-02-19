import {createApp} from 'vue';
import ExamplesIndex from './ExamplesIndex'

// Initialize bootstrap 5
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(ExamplesIndex);
app.mount('#app');
