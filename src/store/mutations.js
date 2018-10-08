export const toggleMenu = state => {
  state.collapse = !state.collapse;
}

export const addTab = (state, tab) => {
  const hasTab = state.tabs.some(item => {
    return tab.path === item.path;
  })
  if(hasTab) return;
  state.tabs.push(tab)
}

export const refreshTab = (state, tabs) => {
  state.tabs = tabs;
}