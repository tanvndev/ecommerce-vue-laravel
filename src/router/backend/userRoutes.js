import UserIndexView from '@/views/backend/user/user/IndexView.vue';
import UserStoreView from '@/views/backend/user/user/StoreView.vue';
import UserCatalogueIndexView from '@/views/backend/user/catalogue/IndexView.vue';
import UserCatalogueStoreView from '@/views/backend/user/catalogue/StoreView.vue';
import { isLoggedIn } from '@/middlewares/authenticate';

const userRoutes = [
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
  },
  {
    path: '/user/update/:id(\\d+)',
    name: 'user.update',
    component: UserStoreView,
    beforeEnter: [isLoggedIn]
  },
  {
    path: '/user/catalogue/index',
    name: 'user.catalogue.index',
    component: UserCatalogueIndexView,
    beforeEnter: [isLoggedIn]
  },
  {
    path: '/user/catalogue/store',
    name: 'user.catalogue.store',
    component: UserCatalogueStoreView,
    beforeEnter: [isLoggedIn]
  },
  {
    path: '/user/catalogue/update/:id(\\d+)',
    name: 'user.catalogue.update',
    component: UserCatalogueStoreView,
    beforeEnter: [isLoggedIn]
  }
];

export default userRoutes;
