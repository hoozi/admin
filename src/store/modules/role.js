import {
  queryRoleByDeptId,
  queryDetailRoleById,
  queryRolePage,
  deleteRoleById,
  editRole
} from '@/api/role';

const SAVE_ROLE = 'SAVE_ROLE';
const RESET_ROLE = 'RESET_ROLE';
const SAVE_ROLE_PAGE = 'SAVE_ROLE_PAGE'
const RESET_ROLE_DETAIL = 'RESET_ROLE_DETAIL';
const SAVE_ROLE_DETAIL = 'SAVE_ROLE_DETAIL';

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
  }
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}