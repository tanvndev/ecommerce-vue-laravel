import './assets/styles/main.css';
import './assets/icons/themify-icons/themify-icons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
