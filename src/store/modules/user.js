import {
  login,
  //logout,
  queryCurrentUser,
  queryUserMenu
} from '@/services/user';
import { setToken, removeToken } from '@/utils/token';
import { formatterMenu, formatterRoute } from '@/utils/formatterMenuOrRoute';
import router, { initialRoutes } from '@/router';
import find from 'lodash/find';

const state = {
  permissions: [],
  userInfo: {},
  userMenu: [],
  routes: [],
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
  async login({ commit, dispatch }, payload) {
    const response = await login(payload);
    if(response && response.access_token) {
      commit(SAVE_TOKEN, response.access_token);
      dispatch('getUserMenu');
      router.push('/');
    }
  },
  async getCurrentUser({ commit } ) {
    const response = await queryCurrentUser();
    if(response && response.code == 0) {
      commit(SAVE_USER, response.data);
    }
  },
  async getUserMenu({ commit, state }, callback) {
    const response = await queryUserMenu();
    if(response && response.length > 0) {
      commit('SAVE_USER_MENU', response);

      // 初始化动态路由
      const _menus = response.map(item => ({...item})); //copy
      const dynamicRoutes = find(initialRoutes, route => route.path === '/');
      dynamicRoutes.children.push(...formatterRoute(formatterMenu(_menus)));
      router.addRoutes([dynamicRoutes]);

      callback && callback(state, response);
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