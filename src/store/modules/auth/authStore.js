import router from '@/router';
import AuthService from '@/services/AuthService';
import Cookies from 'js-cookie';

const user = JSON.parse(Cookies.get('user') ?? null);

// state
const state = {
  status: user ? { loggedIn: true } : { loggedIn: false },
  user: user || null,
  messages: []
};

// getters
const getters = {
  isLoggedIn: (state) => state.status.loggedIn,
  getUser: (state) => state.user?.user,
  getToken: (state) => state.user?.access_token,
  getMessages: (state) => state.messages
};
// actions
const actions = {
  async login({ commit }, payload) {
    const response = await AuthService.login(payload);
    if (!response.success) {
      return commit('loginFailure', response.messages);
    }
    return commit('loginSuccess', response.data);
  },
  async logout({ commit }) {
    await AuthService.logout();
    return commit('logout');
  },
  async refreshToken({ commit }) {
    const response = await AuthService.refreshToken();
    if (!response.success) {
      return commit('loginFailure', response.messages);
    }
    return commit('loginSuccess', response.data);
  }
};

// mutations

const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
    state.messages = '';
  },
  loginFailure(state, message) {
    state.status.loggedIn = false;
    state.user = null;
    state.messages = message;
  },
  refreshTokenSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  refreshTokenFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  logout(state) {
    state.status.loggedIn = false;
    state.user = null;
    state.messages = '';
    router.push('/login');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
