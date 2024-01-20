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
import './assets/css/cart.css';
import './assets/css/profile.css';
import './assets/css/commandes.css';
import './assets/css/lignes_com.css';
import './assets/css/forgot & new_mdp.css';
import './assets/css/edit_mdp.css';
import './assets/css/search.css';
import './assets/css/footer.css';
import './assets/css/dark.css';
import './assets/css/media.css';
import './assets/css/button.css';
import './assets/css/scrollup.css';
import './assets/css/swal/loading.css';

import './assets/js/mon-jquery.js';

import store from './store'

import axios from 'axios';
import Swal from 'sweetalert2';

axios.interceptors.request.use((config) => {
  Swal.fire({
    html: '<div class="loading"></div>',
    showConfirmButton: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    }
  });
  return config;
});
axios.interceptors.response.use(
  (response) => {
    Swal.close();
    return response;
  },
  (error) => {
    Swal.close();
    return Promise.reject(error);
  }
);

const app = createApp(App);

app.use(store).use(router).mount('#app');
