import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router/index';
import store from './store/index';
import './plugins/element.js';
import '@/styles/index.scss';

sync(store, router);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
