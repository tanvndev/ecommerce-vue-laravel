import { createStore } from 'vuex';
import authStore from '@/store/modules/auth/authStore';
import languageStore from './modules/language/languageStore';

// Create a new store instance.
const store = createStore({
  modules: {
    authStore,
    languageStore
  }
});

export default store;
