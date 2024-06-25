import sidebarVn from '@/lang/vn/sidebar';
import sidebarEn from '@/lang/en/sidebar';

// state
const state = {
  language: 'vn',
  sidebar: {
    vn: sidebarVn,
    en: sidebarEn
  }
};

// getters
const getters = {
  getSidebar: (state) => state.sidebar[state.language]
};
// actions
const actions = {};

// mutations

const mutations = {
  setLanguage(state, language) {
    state.language = language;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
