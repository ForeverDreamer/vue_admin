<template>
  <div>
    商品规格
  </div>
</template>

<script>
export default {
  name: 'Sku',
  created () {
    const Strophe = this.$strophe.Strophe
    const conn = new Strophe.Connection('http://example.com:5443/bosh')
    conn.connect('admin@example.com', 'password', this.callback)
    console.log(Strophe)
  },
  methods: {
    callback (status) {
      console.log('callback: ', status)
    }
  }
}
</script>

<style scoped>

</style>
