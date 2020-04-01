<template>
  <el-container class="el-container__outer">
    <el-header class="d-flex align-items-center border-bottom">
      <div class="d-flex align-items-center mr-auto">
        <el-select size="medium" placeholder="请选择" class="mr-2">
          <el-option
            label="区域一"
            value="北京">
          </el-option>
          <el-option
            label="区域二"
            value="上海">
          </el-option>
        </el-select>
        <el-input size="medium" placeholder="请输入内容" class="mr-2"></el-input>
        <el-button size="medium" type="success">搜索</el-button>
      </div>
      <el-button size="medium" type="success">创建相册</el-button>
      <el-button size="medium" type="warning">上传图片</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div style="height: 1000px">
          aside
        </div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Photo'
}
</script>

<style scoped>
  .el-container__outer {
    /*position: fixed;*/
    position: absolute;
    left: 200px;
    right: 0;
    top: 55px;
    bottom: 0;
    overflow: hidden;
  }

  .el-header, .el-aside, .el-main {
    background-color: #fff;
  }

  /*.el-aside__photo {*/
  /*  position: absolute;*/
  /*  top: 60px;*/
  /*  left: 0;*/
  /*  bottom: 60px;*/
  /*}*/

  /*.el-header, .el-footer {*/
  /*  background-color: #B3C0D1;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 60px;*/
  /*}*/

  .el-aside {
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 60px;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    position: absolute;
    top: 60px;
    left: 200px;
    bottom: 60px;
    right: 0;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  /*body > .el-container {*/
  /*  margin-bottom: 40px;*/
  /*}*/

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*  line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*  line-height: 320px;*/
  /*}*/
</style>
