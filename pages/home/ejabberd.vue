<template>
  <div>
    即时通信Ejabberd
  </div>
</template>

<script>
export default {
  name: 'Ejabberd',
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
