import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/mon-style.css';
import './assets/css/navbar.css';
import './assets/css/home.css';
import './assets/css/products.css';
import './assets/css/contact.css';
import './assets/css/login.css';
import './assets/css/signup.css';
import './assets/css/footer.css';
import './assets/css/dark.css';
import './assets/css/media.css';
import './assets/css/button.css';

createApp(App).use(router).mount('#app');
