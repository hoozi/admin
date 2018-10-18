import router, { constRoutes } from '@/router';
import { formatterMenu, formatterRoute } from './formatterMenuOrRoute';

export default function createRoutes(menus) {
  const _menus = menus.map(item => ({...item})); //copy
  router.addRoutes([...formatterRoute(formatterMenu(_menus)), ...constRoutes]);
}