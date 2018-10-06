import capitalize from 'lodash/capitalize';

export default function resolvePath(path) {
  const pathArr = path.split('/');
  return pathArr.map(path => {
    return path ? capitalize(path) : ''
  }).filter(path => path).join('/');
}