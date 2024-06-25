import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/backend/LoginView.vue';
import DashboardView from '@/views/backend/DashboardView.vue';
import UserIndexView from '@/views/backend/User/UserIndexView.vue';
import UserStoreView from '@/views/backend/User/UserStoreView.vue';
import { isLoggedIn } from '@/middlewares/authenticate';

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
    path: '/user/index',
    name: 'user.index',
    component: UserIndexView,
    beforeEnter: [isLoggedIn]
  },
  {
    path: '/user/store',
    name: 'user.store',
    component: UserStoreView,
    beforeEnter: [isLoggedIn]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
