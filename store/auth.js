export const state = () => ({
  token: {
    exp: null,
    access: null
  }
})

export const getters = {
  isAuthenticated (state) {
    return state.token.access != null
  },
  accessToken (state) {
    return state.token.access
  }
}

export const mutations = {
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
    state.token.exp = null
    state.token.access = null
  }
}

export const actions = {
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
      .then((response) => {
        console.log(response)
        const token = response.data.token
        vuexContext.commit('setToken', token)
        // sessionStorage在浏览器中存储 key/value 对，在关闭窗口或标签页之后将会删除这些数据
        // localStorage在浏览器中存储 key/value 对，没有过期时间
        localStorage.setItem('token', token.access)
        localStorage.setItem('tokenExpiration', token.exp)
        // this.$store.commit('menu/initNavMenu', response.data.navMenu)
        this.$router.push('/home')
        return response.data.navMenu
      })
      .catch(e => console.log('login => ' + e))
  },
  initAuth (vuexContext) {
    // console.log('initAuth', vuexContext)
    const token = {}
    token.access = localStorage.getItem('token')
    token.exp = +localStorage.getItem('tokenExpiration')
    const timeStamp = Math.floor(new Date().getTime() / 1000)
    if (timeStamp > token.exp || !token) {
      console.log('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('setToken', token)
    // const navMenu = localStorage.getItem('navMenu')
    // this.$store.commit('menu/initNavMenu', navMenu)
  },
  logout (vuexContext) {
    vuexContext.commit('clearToken')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('navMenu')
  }
}
