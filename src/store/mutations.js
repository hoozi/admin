export const toggleMenu = state => {
  state.collapse = !state.collapse;
}

export const addBookMark = (state, tag) => {
  state.bookMarkList.push(tag)
}