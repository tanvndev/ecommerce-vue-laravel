import { createStore } from 'vuex';
import authStore from '@/store/modules/auth/authStore';
import languageStore from './modules/language/languageStore';
import antStore from './modules/ant/antStore';

// Create a new store instance.
const store = createStore({
  modules: {
    antStore, // toast ant
    authStore,
    languageStore
  }
});

export default store;
