import Notifications from 'notiwind';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './css/index.css';
import router from './router';
import { auth, db } from  '@/firebase';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.use(router).use(Notifications).mount('#app');
