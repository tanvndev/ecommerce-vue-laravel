import sidebarVn from '@/lang/vn/sidebar';
import sidebarEn from '@/lang/en/sidebar';
import { PUBLISH as PUBLISH_EN } from '@/lang/en/constants';
import { PUBLISH as PUBLISH_VN } from '@/lang/vn/constants';
import { PRODUCT_TYPE as PRODUCT_TYPE_EN } from '@/lang/en/constants';
import { PRODUCT_TYPE as PRODUCT_TYPE_VN } from '@/lang/vn/constants';

// state
const state = {
  language: 'vn',
  sidebar: {
    vn: sidebarVn,
    en: sidebarEn
  },
  publish: {
    vn: PUBLISH_VN,
    en: PUBLISH_EN
  },
  productType: {
    vn: PRODUCT_TYPE_VN,
    en: PRODUCT_TYPE_EN
  }
};

// getters
const getters = {
  getSidebar: (state) => state.sidebar[state.language],
  getPublishFilter: (state) => state.publish[state.language],
  getProductType: (state) => state.productType[state.language]
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
