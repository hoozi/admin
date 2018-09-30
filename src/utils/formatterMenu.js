import isUrl from './isUrl';

export default function formatterMenu(menus, parentPath = '') {
  return menus.map(item => {
    let { path } = item;
    if(!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path
    };
    if (item.children.length > 0) {
      result.children = formatterMenu(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}