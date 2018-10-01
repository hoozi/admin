import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from '@/router';
import { initialRoutes } from '@/router';
import store from './store/index';
import './plugins/element.js';
import '@/styles/index.scss';
import { formatterRoute } from '@/utils/formatterMenuOrRoute';

sync(store, router);

Vue.config.productionTip = false

// 初始化菜单， 初始化动态路由
store.dispatch('user/getUserMenu', (state, menus) => {
  router.addRoutes(initialRoutes.concat(formatterRoute(menus)));
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
