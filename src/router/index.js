import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/token';
import store from '@/store';
/*import { formatterRoute } from '@/utils/formatterMenuOrRoute'; */

NProgress.configure({ showSpinner: false });

Vue.use(Router);

export const initialRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout'),
    name: 'layout',
    children: []
  }
]

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start();

  // 用户是否登录（token）
  if( getToken() ) {

    // 已经登录的情况下,阻止再跳转到登录页
    if(to.path == '/login') {
      next({ path: '/', replace: true });
      NProgress.done();
    } else {
      const { path, name:label } = to;
      if(path && label) {
        store.commit('addBookMark', {
          path,
          label
        });
      }
      next();
    }

  } else {
    if(to.path == '/login') {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
})

export default router;