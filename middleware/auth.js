export default function (context) {
  console.log('[Middleware] Auth')
  if (!context.store.getters['auth/isAuthenticated']) {
    context.redirect('/login')
  }
}
