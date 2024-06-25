import { createStore } from 'vuex';
import authStore from '@/store/modules/auth/authStore';

// Create a new store instance.
const store = createStore({
  modules: {
    authStore
  }
});

export default store;
