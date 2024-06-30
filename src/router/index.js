import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/backend/LoginView.vue';
import DashboardView from '@/views/backend/DashboardView.vue';
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
  ...userRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
