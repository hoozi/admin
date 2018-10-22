import {
  queryRoleByDeptId,
  queryDetailRoleById,
  queryRolePage,
  deleteRoleById,
  editRole,
  setAuth2Role,
  queryAuthByCode
} from '@/api/role';

const SAVE_ROLE = 'SAVE_ROLE';
const RESET_ROLE = 'RESET_ROLE';
const SAVE_ROLE_PAGE = 'SAVE_ROLE_PAGE'
const RESET_ROLE_DETAIL = 'RESET_ROLE_DETAIL';
const SAVE_ROLE_DETAIL = 'SAVE_ROLE_DETAIL';
const SAVE_AUTH_LIST = 'SAVE_AUTH_LIST'

const baseDetail = {
  roleName: '',
  roleCode: '',
  roleDesc: '',
  deptName: '',
  roleDeptId: ''
}

const state = {
  role: [],
  current: 1,
  pages: 0,
  records: [],
  size: 10,
  total: 0,
  detail: {
    ...baseDetail
  },
  currentAuth: []
}

const getters = {
  
}

const mutations = {
  [SAVE_ROLE](state, role) {
    Object.assign(state, {role})
  },
  [RESET_ROLE](state) {
    const role = [];
    Object.assign(state, {role});
  },
  [SAVE_ROLE_PAGE](state, pager) {
    Object.assign(state, {...pager});
  },
  [SAVE_ROLE_DETAIL](state, detail) {
    Object.assign(state.detail, detail);
  },
  [RESET_ROLE_DETAIL](state) {
    Object.assign(state.detail, baseDetail); 
  },
  [SAVE_AUTH_LIST](state, currentAuth) {
    Object.assign(state, {currentAuth});
  }
}

const actions = {
  async getRoleByDeptId({commit}, id) {
    const response = await queryRoleByDeptId(id);
    if(response && response.code !== 0) return;
    commit(SAVE_ROLE, response.data)
  },
  async getPager({commit}, params) {
    const { current, size } = state;
    const response = await queryRolePage({current, size, ...params});
    if(response && response.code !== 0) return;
    commit(SAVE_ROLE_PAGE, response.data);
  },
  async getDetail({commit}, { id, callback }) {
    const response = await queryDetailRoleById(id);
    if(response && response.code !== 0) return;
    commit(SAVE_ROLE_DETAIL, response.data);
    callback && callback(response.data);
  },
  async addOrEditRole({ dispatch }, { params, method, callback }) {
    const response = await editRole({params, method});
    if(response && response.code !== 0) return;
    callback && callback();
    dispatch('getPager');
  },
  async deleteRole({ dispatch }, id) {
    const response = await deleteRoleById(id);
    if(response && response.code !== 0) return;
    dispatch('getPager');
  },
  async getCurrentAuth({commit}, {code, callback}) {
    const response = await queryAuthByCode(code);
    if(response && response.code !== 0) retursn;
    commit(SAVE_AUTH_LIST, response.data);
    callback && callback();
  },
  async setAuth({ dispatch }, { params, callback }) {
    const response = await setAuth2Role(params);
    if(response && response.code !== 0) return;
    callback && callback();
    dispatch('getPager');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}