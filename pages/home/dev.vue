<template>
  <div class="px-1">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="窗口1">
        <el-input v-model="form.windows[0]" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="窗口2">
        <el-input v-model="form.windows[1]" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="窗口3">
        <el-input v-model="form.windows[2]" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="窗口4">
        <el-input v-model="form.windows[3]" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="open">打开</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Dev',
  data () {
    return {
      form: {
        windows: ['', '', '', '']
      }
    }
  },
  methods: {
    open () {
      const data = this.form.windows.map(w => w.split('\n'))
      console.log(data)
      this.$axios.$post(
        '/bt/',
        data)
        .then((response) => {
          console.log(response)
        })
        .catch(e => console.log('login => ' + e))
    }
  }
}
</script>

<style scoped>

</style>
