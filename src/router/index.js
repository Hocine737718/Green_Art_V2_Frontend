import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
const routes = [
  {
    path: '/',
    name: 'acceuil',
    component: HomeView
  },
  {
    path: '/produits',
    name: 'produits',
    component: ProductsView
  },
  {
    path: '/contactez-nous',
    name: 'contactez-nous',
    component: ContactView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router
