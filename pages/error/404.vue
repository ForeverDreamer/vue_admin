<template>
  <h1>404 页面不存在！</h1>
</template>

<script>
export default {
  name: '404',
  created () {
    setTimeout(() => {
      this.$router.push('/home/')
    }, 3000)
  },
  layout: 'login'
}
</script>

<style scoped>

</style>
