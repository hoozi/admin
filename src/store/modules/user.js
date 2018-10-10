import {
  login,
  //logout,
  queryCurrentUser,
  queryUserMenu,
  queryUserPage
} from '@/services/user';
import { setToken, removeToken } from '@/utils/token';
import { formatterMenu } from '@/utils/formatterMenuOrRoute';
import router from '@/router';
import createRoutes from '@/utils/createRoutes';

const state = {
  permissions: [],
  userInfo: {},
  userMenu: [],
  token: '',
  userPage: {
    current: 1,
    pages: 0,
    records: [],
    size: 0,
    total: 0
  }
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
    state.token = '';
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
      createRoutes(response);

      callback && callback(state, response);
    }
  },
  async getUserPage({ commit }, params) {
    const response = await queryUserPage(params);
    console.log(response)
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