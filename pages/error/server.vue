<template>
  <h1>服务器内部错误！</h1>
</template>

<script>
export default {
  name: 'Server',
  created () {
    setTimeout(() => {
      this.$router.push('/login/')
    }, 3000)
  },
  layout: 'login'
}
</script>

<style scoped>

</style>
