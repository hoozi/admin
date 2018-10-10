import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/token';
import store from '@/store';
import { urlReg } from '@/utils/const';
/*import { formatterRoute } from '@/utils/formatterMenuOrRoute'; */

NProgress.configure({ showSpinner: false });

Vue.use(Router);

export const constRoutes = [
  {
    path: '/404',
    name: 'err404',
    component: () => import('@/pages/Exception/404')
  },
  {
    path: '/500',
    name: 'err500',
    component: () => import('@/pages/Exception/500')
  },
  { path: '*', redirect: '/404' }
]

export const initialRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/Home')
      }
    ]
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

const whiteList = {
  '/': true,
  '/404': true,
  '/500': true
}

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
      const inUrl = urlReg.test(path);
      if(path && label && !whiteList[path] && !inUrl) {
        store.commit('addTab', {
          path,
          label,
          closable: true
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