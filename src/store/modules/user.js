import {
  login,
  logout,
  queryCurrentUser,
  queryUserMenu
} from '@/services/user';
import { setToken, removeToken } from '@/utils/token';
import formatterMenu from '@/utils/formatterMenu';
import router from '@/router/index';

const state = {
  permissions: [],
  userInfo: {},
  userMenu: [],
  token: ''
}

const SAVE_USER = 'SAVE_USER';
const SAVE_TOKEN = 'SAVE_TOKEN';
const SAVE_USER_MENU = 'SAVE_USER_MENU';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

const getters = {
  username(state) {
    return state.userInfo.username;
  },
  menus(state) {
    return state.userMenu;
  }
}

const mutations = {
  [SAVE_USER](state, user) {
    state.permissions = user.permissions;
    state.userInfo = user.sysUser;
  },
  [SAVE_TOKEN](state, token) {
    state.token = token;
    setToken(token);
  },
  [REMOVE_TOKEN](state) {
    state.token = [];
    removeToken();
  },
  [SAVE_USER_MENU](state, userMenu) {
    state.userMenu = formatterMenu(userMenu);
  }
}

const actions = {
  async login({ dispatch, commit }, payload) {
    const response = await login(payload);
    if(response.access_token) {
      commit(SAVE_TOKEN, response.access_token);
      router.push('/');
    }
  },
  async getCurrentUser({ commit } ) {
    const response = await queryCurrentUser();
    if(response.code == 0) {
      commit(SAVE_USER, response.data);
    }
  },
  async getUserMenu({ commit }) {
    const response = await queryUserMenu();
    if(response.length > 0) {
      commit('SAVE_USER_MENU', response);
    }
  },
  logout({ commit, rootState }) {
    commit(REMOVE_TOKEN);
    router.push(`/login?redirect=${rootState.route.path}`)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}