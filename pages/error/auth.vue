<template>
  <h1>用户名或密码错误！</h1>
</template>

<script>
export default {
  name: 'Auth',
  created () {
    setTimeout(() => {
      this.$router.push('/login')
    }, 3000)
  },
  layout: 'login'
}
</script>

<style scoped>

</style>
