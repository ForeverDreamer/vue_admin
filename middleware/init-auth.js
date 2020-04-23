export default function (context) {
  context.store.dispatch('auth/initAuth')
  const navMenu = localStorage.getItem('navMenu')
  console.log('[Middleware] initAuth', Object.keys(context.store.state.menu.navMenu).length)
  if (Object.keys(context.store.state.menu.navMenu).length === 0) {
    context.store.commit('menu/localNavMenu', JSON.parse(navMenu))
  }
}
