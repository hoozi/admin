import {
  queryDeptTree
} from '@/api/dept';

const SAVE_DEPT_TREE = 'SAVE_DEPT_TREE'

const state = {
  tree: []
}

const getters = {
  
}

const mutations = {
  [SAVE_DEPT_TREE](state, tree) {
    Object.assign(state, {tree});
  }
}

const actions = {
  async getDeptTree({commit}) {
    const response = await queryDeptTree();
    if(response && response.code !== 0) return;
    commit(SAVE_DEPT_TREE, response.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}