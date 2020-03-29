<template>
  <el-container direction="vertical">
    <el-breadcrumb class="border-bottom pb-2 m-1" separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadArray" :key="index" :to="{ path: item.path }">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <nuxt-child />
<!--    <li v-for="i in 100" :key="i">{{ i }}</li>-->
<!--    <p>{{ homeData }}</p>-->
  </el-container>

</template>

<script>
export default {
  name: 'Index',
  // middleware: 'log'
  data () {
    return {
      homeData: {},
      breadArray: [
        {
          name: '后台首页',
          path: ''
        },
        {
          name: '用户管理',
          path: ''
        },
        {
          name: '相册管理',
          path: ''
        }
      ]
    }
  },
  methods: {
    initData () {
      this.$axios.$get(
        '/product/recommends/')
        .then((data) => {
          console.log(JSON.stringify(data))
          this.homeData = data
        })
        .catch(e => console.log('/product/recommends/ => ' + e))
    }
    // 获取面包屑路由
    // getRouterBread () {
    //   const bread = this.$route.matched.filter(v => v.name)
    //   const arr = []
    //   bread.forEach((v, k) => {
    //     arr.push({
    //       name: v.name,
    //       path: v.path
    //     })
    //   })
    //   if (arr.length > 0) {
    //     arr.unshift({ name: 'home', path: '/home', title: '后台首页' })
    //     this.breadArray = arr
    //   }
    // }
  },
  created () {
    // this.initData()
  }
}
</script>

<style scoped>
  /*.el-main {*/
  /*  padding: 0!important;*/
  /*}*/
</style>
