<template>
  <el-container>
    <h1>首页</h1>
    <el-button type="primary" @click.prevent="getData">获取首页数据测试</el-button>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  // middleware: 'log'
  methods: {
    getData () {
      this.$axios.$get(
        '/product/recommends/')
        .then((result) => {
          console.log(result)
        })
        .catch(e => console.log('/product/recommends/ => ' + e))
    }
  }
}
</script>

<style scoped>

</style>
