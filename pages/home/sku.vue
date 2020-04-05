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
    console.log(this.$ejabberdInfo)
    const conn = new Strophe.Connection('http://' + this.$ejabberdInfo.domain + ':' + this.$ejabberdInfo.port + '/bosh')
    conn.connect(this.$ejabberdInfo.jid, this.$ejabberdInfo.password, this.callback)
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
