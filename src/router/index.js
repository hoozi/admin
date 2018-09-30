import Vue from 'vue';
import Router from 'vue-router';
import About from './About';
import Home from './Home';
import Login from '@/pages/Login';
import BasicLayout from '@/layouts/BasicLayout';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/token';

NProgress.configure({ showSpinner: false });

Vue.use(Router)

const routes = [
  { 
    path: '/', 
    component: BasicLayout,
    redirect: '/home', 
    children: [
      { 
        name: 'about',
        path: '/about', 
        component: () => import('./About.vue'),
        meta: {
          title: '关于'
        },
        children: [
          {
            name: 'us',
            path: 'us',
            component: () => import('./Home.vue'),
            meta: {
              title:'我们'
            }
          }
        ]
      },
      { 
        name: 'home',
        path: '/home', 
        component: () => import('./Home.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();

  // 用户是否登录（token）
  if( getToken() ) {

    // 已经登录的情况下,阻止再跳转到登录页
    if(to.path == '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
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