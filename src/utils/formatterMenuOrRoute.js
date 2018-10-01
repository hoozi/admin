import isUrl from './isUrl';

export const formatterMenu = function formatterMenu(menus, parentPath = '') {
  return menus.map(item => {
    let { path } = item;
    if(!isUrl(path)) {
      path = parentPath + item.path;
    }
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
    const result = {
      ...item,
      path,
      component: () => import(`@/${component}`),
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
