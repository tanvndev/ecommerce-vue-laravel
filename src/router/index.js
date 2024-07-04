import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import LoginView from '@/views/backend/LoginView.vue';
import DashboardView from '@/views/backend/DashboardView.vue';
import { FileManager } from '@/components/backend';
import { isLoggedIn } from '@/middlewares/authenticate';
import userRoutes from './backend/userRoutes';
const routes = [
  {
    path: '/admin',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: [isLoggedIn]
  },
  {
    path: '/fileManager',
    name: 'fileManager',
    component: FileManager,
    beforeEnter: [isLoggedIn]
  },
  ...userRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  store.dispatch('loadingStore/startLoading');
  next();
});

router.afterEach(() => {
  store.dispatch('loadingStore/stopLoading');
});

export default router;
