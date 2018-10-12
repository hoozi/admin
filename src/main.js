import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from '@/router';
import store from '@/store';
import './plugins/element.js';
import '@/styles/index.scss';
import * as filters from '@/filters';

sync(store, router);

Vue.config.productionTip = false

store.dispatch('user/getUserMenu');

for(let filterName in filters) {
  Vue.filter(filterName, filters[filterName])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
