import {
  login,
  //logout,
  queryCurrentUser,
  queryUserMenu,
  deleteUser,
  queryUserPage,
  queryDetailUser
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

  current: 1,
  pages: 0,
  records: [],
  size: 10,
  total: 0,

  detail: {}
  
}

const SAVE_USER = 'SAVE_USER';
const SAVE_TOKEN = 'SAVE_TOKEN';
const SAVE_USER_MENU = 'SAVE_USER_MENU';
const REMOVE_TOKEN = 'REMOVE_TOKEN';
const SAVE_USER_PAGE = 'SAVE_USER_PAGE';
const SAVE_USER_DETAIL = 'SAVE_USER_DETAIL';
//const SAVE_USER_PERMISSIONS = 'SAVE_USER_PERMISSIONS';

const getters = {
  username(state) {
    return state.userInfo.username;
  },
  menus(state) {
    return state.userMenu;
  },
  records(state) {
    return state.records;
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
  },
  [SAVE_USER_PAGE](state, userPage) {
    for(let key in userPage) {
      state[key] = userPage[key];
    }
  },
  [SAVE_USER_DETAIL](state, detail) {
    state.detail = detail;
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
    if(response && response.code !== 0 ) return; 
    
    commit(SAVE_USER_MENU, response.data);

    // 初始化动态路由
    createRoutes(response.data);

    callback && callback(state, response);
    
  },
  async getPager({ commit, state }, params) {
    const { current, size } = state;
    const response = await queryUserPage({current, size, ...params});
    if(response && response.code !== 0) return;
    commit(SAVE_USER_PAGE, response.data);
  },
  async deleteUser( { dispatch }, id ) {
    const response = await deleteUser(id);
    if(response && response.code !== 0) return;
    dispatch('getPager');
  },
  async getDetail({commit}, id) {
    const response = await queryDetailUser(id);
    if(response && response.code !== 0) return;
    commit(SAVE_USER_DETAIL, response.data);
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