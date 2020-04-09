<template>
  <div class="border py-1 px-2 rounded mr-2 position-relative d-flex align-items-center">
    <div v-if="type !== 0" style="line-height: 1;">
      <!--颜色选择器-->
      <el-color-picker v-if="type === 1" size="mini" class="mr-2"></el-color-picker>
      <!--图片选择-->
      <span v-else class="btn btn-light border p-1 mr-2" style="line-height: 1;">
        <i class="el-icon-plus"></i>
      </span>
    </div>
    <el-input size="mini" placeholder="请输入内容"></el-input>
    <span class="btn btn-light p-0 position-absolute" style="line-height: 1; right: -10px; top: -10px">
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SkuCardChild',
  props: {
    type: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
