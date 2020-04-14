<template>
  <h1>没有操作权限！</h1>
</template>

<script>
export default {
  name: 'Permission',
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
