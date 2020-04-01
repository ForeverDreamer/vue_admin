<template>
  <el-container class="el-container__outer">
    <el-header class="d-flex align-items-center border-bottom">
      <div class="d-flex align-items-center mr-auto">
        <el-select v-model="searchInfo.orderBy" placeholder="排序方式" size="medium" class="mr-2">
          <el-option
            label="区域一"
            value="北京"
          />
          <el-option
            label="区域二"
            value="上海"
          />
        </el-select>
        <el-input v-model="searchInfo.keyword" placeholder="请输入相册名称" size="medium" class="mr-2" />
        <el-button size="medium" type="success">
          搜索
        </el-button>
      </div>
      <el-button size="medium" type="success" @click="openEditForm(null)">
        创建相册
      </el-button>
      <el-button size="medium" type="warning">
        上传图片
      </el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <ul class="list-group list-group-flush">
          <li
            v-for="(item, index) in albums"
            :key="index"
            class="list-group-item list-group-item-action d-flex align-items-center"
            :class="{'active doer-active': activeIndex === index}"
            @click.stop="changeAlbum(index)"
          >
            {{ item.name }}
            <el-dropdown class="ml-auto">
              <span class="btn btn-light btn-sm border">
                {{ item.num }}<i class="el-icon-arrow-down el-icon--right"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.stop.native="openEditForm({item, index})">编辑</el-dropdown-item>
                <el-dropdown-item @click.stop.native="delAlbum(index)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
    <el-footer>Footer</el-footer>
    <el-dialog
      title="修改相册"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editForm.name" size="medium" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.order" :min="0" size="small"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Photo',
  data () {
    return {
      searchInfo: {
        orderBy: '相册名称',
        keyword: '图片数量'
      },
      activeIndex: 0,
      albums: [],
      dialogVisible: false,
      editForm: {
        name: '',
        order: '',
        editIndex: -1
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      for (let i = 0; i < 20; i++) {
        this.albums.push({
          name: '相册' + i,
          num: Math.floor(Math.random() * 100),
          order: 0
        })
      }
    },
    changeAlbum (index) {
      this.activeIndex = index
    },
    delAlbum (index) {
      this.$confirm('是否删除该相册?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.albums.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // 用户取消，catch一下避免console报错
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    openEditForm (album) {
      // console.log(album)
      console.log(JSON.stringify(album))
      // 编辑相册
      if (album) {
        // const { item, index } = album
        this.editForm.name = album.item.name
        this.editForm.order = album.item.order
        this.editForm.editIndex = album.index
      } else {
        // 新建相册
        this.editForm = {
          name: '',
          order: 0,
          editIndex: -1
        }
      }
      this.dialogVisible = true
    },
    confirmEdit () {
      // 编辑相册
      if (this.editForm.editIndex > -1) {
        this.editAlbum()
      } else {
        // 新建相册
        this.albums.unshift({
          name: this.editForm.name,
          order: this.editForm.order,
          num: 0
        })
      }
      this.dialogVisible = false
    },
    editAlbum () {
      this.albums[this.editForm.editIndex].name = this.editForm.name
      this.albums[this.editForm.editIndex].order = this.editForm.order
    }
  }
}
</script>

<style scoped>
  .doer-active {
    color: #67C23A!important;
    background-color: #F0F9EB!important;
    border-color: #C237B0!important;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

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
    border-right: 1px solid #dee2e6;
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 200px;*/
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
