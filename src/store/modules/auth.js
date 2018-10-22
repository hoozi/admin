import {
  queryAuth
} from '@/api/auth';

const SAVE_AUTH = 'SAVE_AUTH';

const state = {
  auth: []
}

const getters = {
  
}

const mutations = {
  [SAVE_AUTH](state, auth) {
    Object.assign(state, {auth})
  }
}

const actions = {
  async getAuth({commit}, callback) {
    const response = await queryAuth();
    if(response && response.code !== 0) return;
    commit(SAVE_AUTH, response.data);
    callback && callback();
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}