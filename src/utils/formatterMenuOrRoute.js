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

const urlReg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

export const getRedirect = item => {
  let r = ''
  
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      r = `${!urlReg.test(item.children[0].path) ? item.children[0].path : null}`;
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
  return r
};

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
    result.redirect = getRedirect(item)
    return result;
  });
  
}
