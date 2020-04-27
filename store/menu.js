export const state = () => ({
  navMenu: {}
})

export const getters = {
  routePermitted: state => (url) => {
    console.log('routePermitted', url, state.navMenu)
    return state.navMenu.permitted_routes.includes(url)
  }
}

export const mutations = {
  initNavMenu (state, navMenu) {
    // console.log('initNavMenu', navMenu)
    if (navMenu === null) {
      return
    }
    state.navMenu.activeIndex = navMenu.admin_info.active_index
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
      name: navMenu.admin_info.name,
      avatar: process.env.serverURL + navMenu.admin_info.avatar
    }
    navMenu.permitted_routes.push('/')
    state.navMenu.permitted_routes = navMenu.permitted_routes
    localStorage.setItem('navMenu', JSON.stringify(state.navMenu))
    console.log('initNavMenu', state.navMenu, process.env.serverURL)
  },
  restoreNavMenu (state) {
    const navMenu = localStorage.getItem('navMenu')
    // console.log('restoreNavMenu', navMenu)
    // console.log('[Middleware] initAuth', navMenu, Object.keys(context.store.state.menu.navMenu).length)
    if (navMenu !== null && Object.keys(state.navMenu).length === 0) {
      state.navMenu = JSON.parse(navMenu)
    }
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
