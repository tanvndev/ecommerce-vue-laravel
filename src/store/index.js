import { createStore } from 'vuex';
import authStore from '@/store/modules/auth/authStore';
import languageStore from './modules/language/languageStore';
import swalStore from './modules/swal/swalStore';

// Create a new store instance.
const store = createStore({
  modules: {
    swalStore, // toast message
    authStore,
    languageStore
  }
});

export default store;
