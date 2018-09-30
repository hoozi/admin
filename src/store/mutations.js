export const toggleMenu = state => {
  state.collapse = !state.collapse;
}

export const addTag = (state, tag) => {
  state.tagList.push(tag)
}