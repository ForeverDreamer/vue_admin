<template>
  <div class="container">
    <h1>网站首页</h1>
  </div>
</template>

<script>

export default {
  created () {
    const isLogin = true
    if (isLogin) {
      this.$router.push('/home')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
