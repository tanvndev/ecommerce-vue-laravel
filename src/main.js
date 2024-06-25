import './assets/styles/main.css';
import './assets/icons/themify-icons/themify-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);
app.use(store);
app.mount('#app');
