/**
 * 扁平化菜单
 * @param {Array} menus 嵌套菜单
 * @returns {Object} keys 扁平化后的菜单对象 e.g {'/a/b':{...}}
 */
export function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

