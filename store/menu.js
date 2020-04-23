export const state = () => ({
  navMenu: {
    activeIndex: '0',
    menus: []
  }
})

export const getters = {

}

export const mutations = {
  initNavMenu (state, navMenu) {
    state.navMenu.activeIndex = navMenu.activeIndex
    state.navMenu.menus = navMenu.menus.map((menu) => {
      const submenus = menu.submenus.map((submenu) => {
        return {
          name: submenu.name,
          icon: submenu.icon,
          url: submenu.url
        }
      })
      return {
        name: menu.name,
        url: menu.url,
        subActiveIndex: '0',
        submenus
      }
    })
    state.navMenu.adminInfo = navMenu.adminInfo
    localStorage.setItem('navMenu', JSON.stringify(state.navMenu))
  }
}

export const actions = {
}
