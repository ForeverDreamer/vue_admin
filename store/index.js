import Vuex from 'vuex'
// import Cookie from 'js-cookie'

// 经典模式再nuxt 3会弃用，改成普通模式
const createStore = () => {
  return new Vuex.Store({
    state: {
      token: {
        refresh: null,
        access: null
      }
    },
    mutations: {
      setToken (state, token) {
        state.token = token
        this.$axios.setToken(token.access, 'Bearer')
        // this.$axios.setHeader('Authorization', 'Bearer ' + token.access)
        // http request 拦截器
        // this.$axios.interceptors.request.use(
        //   (config) => {
        //     config.headers.Authorization = 'Bearer ' + token.access
        //     return config
        //   },
        //   (err) => {
        //     return Promise.reject(err)
        //   })
      },
      clearToken (state) {
        state.token.refresh = null
        state.token.access = null
      }
    },
    actions: {
      authenticateUser (vuexContext, authData) {
        if (vuexContext.getters.isAuthenticated) {
          console.log('vuexContext.store.getters.isAuthenticated')
          return
        }
        return this.$axios.$post(
          '/account/passwordlogin/',
          {
            username: authData.username,
            password: authData.password
          })
          .then((result) => {
            console.log(result)
            vuexContext.commit('setToken', result.data.token)
            this.$router.push('/home')
          })
          .catch(e => console.log('login => ' + e))
      }
    },
    getters: {
      isAuthenticated (state) {
        return state.token.access != null
      },
      accessToken (state) {
        return state.token.access
      }
    }
  })
}

export default createStore
