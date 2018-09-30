import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

// modules
import user from './modules/user';

Vue.use(Vuex)

const state = {
  collapse: false,
  tagList: []
}

export default new Vuex.Store({
  modules: {
    user
  },
  state,
  getters,
  mutations,
  actions
})