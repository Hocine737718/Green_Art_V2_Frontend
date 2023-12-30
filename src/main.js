import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/mon-style.css';
import './assets/css/navbar.css';
import './assets/css/dark.css';
import './assets/css/media.css';

createApp(App).use(router).mount('#app');
