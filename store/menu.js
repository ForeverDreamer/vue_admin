export const state = () => ({
  navMenu: {}
})

export const getters = {

}

export const mutations = {
  initNavMenu (state, navMenu) {
    if (navMenu === null) {
      return
    }
    state.navMenu.activeIndex = navMenu.active_index
    state.navMenu.menus = navMenu.menus.map((menu) => {
      // const submenus = menu.submenus.map((submenu) => {
      //   return {
      //     name: submenu.name,
      //     icon: submenu.icon,
      //     url: submenu.url
      //   }
      // })
      return {
        name: menu.name,
        url: menu.url,
        subActiveIndex: menu.sub_active_index,
        submenus: menu.submenus
      }
    })
    state.navMenu.adminInfo = {
      name: navMenu.admininfo.name,
      avatar: process.env.serverURL + navMenu.admininfo.avatar
    }
    localStorage.setItem('navMenu', JSON.stringify(state.navMenu))
    console.log('initNavMenu', state.navMenu, process.env.serverURL)
  },
  localNavMenu (state, navMenu) {
    state.navMenu = navMenu
  },
  changeNavMenu (state, index) {
    state.navMenu.activeIndex = index
  },
  changeSubmenu (state, { activeIndex, subActiveIndex }) {
    state.navMenu.menus[activeIndex].subActiveIndex = subActiveIndex
  }
}

export const actions = {
}
