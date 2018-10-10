import isUrl from './isUrl';
import resolvePath from './resolvePath';

export const formatterMenu = function formatterMenu(menus, parentPath = '') {
  return menus.map(item => {
    let { path } = item;
    path = parentPath + item.path;
    const result = {
      ...item,
      path,
      meta: {
        title: item.label,
        icon: item.icon
      }
    };
    if (item.children.length > 0) {
      result.children = formatterMenu(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export const formatterRoute = function formatterRoute(menus) {
  
  return menus.map(item => {
    let { path, label, component} = item;
    let componentPath = '';
    if(!isUrl(path)) {
      if(component) {
        componentPath = `${ component.indexOf('/')>=0 ? component : 'layouts/'+component }`;
      } else {
        componentPath = `pages/${resolvePath(path)}`
      }
    }
    const result = {
      ...item,
      path,
      component: () => import(`@/${componentPath}`),
      meta: {
        title: label
      }
    };
    if (item.children.length > 0) {
      result.children = formatterRoute(item.children);
    }
    return result;
  });
  
}
