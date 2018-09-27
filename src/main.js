import Vue from 'vue'
import App from '@/layouts/BasicLayout';
import router from './router'
import store from './store'
import './plugins/element.js';
import '@/styles/reset.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
