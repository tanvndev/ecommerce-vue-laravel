import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/backend/LoginView.vue';
import DashboardView from '@/views/backend/DashboardView.vue';

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
    component: DashboardView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
