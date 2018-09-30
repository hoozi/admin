export const collapse = state => {
  return state.collapse;
}

export const tag = state => id => {
  return state.tagList.filter(tag => {tag.id == id});
}
