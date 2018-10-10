import router, { initialRoutes, constRoutes } from '@/router';
import find from 'lodash/find';
import { formatterMenu, formatterRoute } from './formatterMenuOrRoute';

export default function createRoutes(menus) {
  const _menus = menus.map(item => ({...item})); //copy
  const dynamicRoutes = find(initialRoutes, route => route.path === '/');
  dynamicRoutes.children.unshift(...formatterRoute(formatterMenu(_menus)));
  router.addRoutes([dynamicRoutes, ...constRoutes]);
}