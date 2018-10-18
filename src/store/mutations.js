export const TOGGLE_MENU = state => {
  state.collapse = !state.collapse;
}

export const ADD_TAB = (state, tab) => {
  const hasTab = state.tabs.some(item => {
    return tab.path === item.path;
  })
  if(hasTab) return;
  state.tabs.push(tab)
}

export const REFRESH_TAB = (state, tabs) => {
  state.tabs = tabs;
}

export const SET_LOADING = (state, effects) => {
  for(let key in effects) {
    state.loading[key] = effects[key];
  }
}