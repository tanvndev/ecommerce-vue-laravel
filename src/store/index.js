import { createStore } from 'vuex';
import { authStore, languageStore, antStore, finderStore } from '@/store/modules/';

// Create a new store instance.
const store = createStore({
  modules: {
    antStore, // toast ant
    authStore,
    languageStore,
    finderStore
  }
});

export default store;
