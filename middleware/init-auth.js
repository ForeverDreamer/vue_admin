export default function (context) {
  console.log('[Middleware] initAuth')
  context.store.dispatch('initAuth')
}
