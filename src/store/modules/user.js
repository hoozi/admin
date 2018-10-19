import {
  login,
  //logout,
  queryCurrentUser,
  queryUserMenu,
  deleteUserById,
  queryUserPage,
  queryDetailUserById,
  editUser,
} from '@/api/user';
import { setToken, removeToken } from '@/utils/token';
import { formatterMenu } from '@/utils/formatterMenuOrRoute';
import router from '@/router';
import createRoutes from '@/utils/createRoutes';

const SAVE_USER = 'SAVE_USER';
const SAVE_TOKEN = 'SAVE_TOKEN';
const SAVE_USER_MENU = 'SAVE_USER_MENU';
const REMOVE_TOKEN = 'REMOVE_TOKEN';
const SAVE_USER_PAGE = 'SAVE_USER_PAGE';
const SAVE_USER_DETAIL = 'SAVE_USER_DETAIL';
const RESET_USER_DETAIL = 'RESET_USER_DETAIL';
//const SAVE_USER_PERMISSIONS = 'SAVE_USER_PERMISSIONS';

const baseDetail = {
  username: '',
  password: '',
  delFlag: '0',
  deptName: '',
  role: [],
  deptId: ''
}

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

  detail: {
    ...baseDetail
  }
  
}

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
    Object.assign(state, {permissions:user.permissions});
    Object.assign(state, {userInfo:user.sysUser});
  },
  [SAVE_TOKEN](state, token) {
    Object.assign(state, {token});
    setToken(token);
  },
  [REMOVE_TOKEN](state) {
    state.token = '';
    removeToken();
  },
  [SAVE_USER_MENU](state, userMenu) {
    Object.assign(state, { userMenu: formatterMenu(userMenu) });
  },
  [SAVE_USER_PAGE](state, userPage) {
    Object.assign(state, {...userPage});
  },
  [SAVE_USER_DETAIL](state, detail) {
    const role = detail.roleList.map(item => item.roleId);
    Object.assign(state.detail, detail, {role, password: ''});
  },
  [RESET_USER_DETAIL](state) {
    Object.assign(state.detail, baseDetail); 
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
    const response = await deleteUserById(id);
    if(response && response.code !== 0) return;
    dispatch('getPager');
  },
  async getDetail({commit}, { id, callback }) {
    const response = await queryDetailUserById(id);
    if(response && response.code !== 0) return;
    commit(SAVE_USER_DETAIL, response.data);
    callback && callback(response.data);
  },
  async addOrEditUser({ dispatch }, { params, method, callback }) {
    const response = await editUser({params, method});
    if(response && response.code !== 0) return;
    callback && callback();
    dispatch('getPager');
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