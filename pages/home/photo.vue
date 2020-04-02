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
      <el-button size="medium" type="warning" @click="uploadDialogVisible = true">
        上传图片
      </el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <ul class="list-group list-group-flush">
          <album-item
            v-for="(item, index) in albums"
            :key="index"
            :item="item"
            :index="index"
            :active="activeIndex === index"
            @change="changeAlbum"
            @edit="openEditForm"
            @del="delAlbum"
          />
        </ul>
      </el-aside>
      <el-main>
        <el-row :gutter="10">
          <el-col
            v-for="i in 10"
            :key="i"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="4"
          >
            <el-card class="position-relative mb-3" :body-style="{ padding: '0px' }" shadow="hover" style="cursor: pointer">
              <div class="demo-image__preview w-100">
                <el-image
                  style="height: 100px"
                  :src="previewImgs.url"
                  :preview-src-list="previewImgs.srcList"
                  fit="fill">
                </el-image>
              </div>
              <div class="w-100 mt-n4 text-white position-absolute" style="background: rgba(0,0,0,0.5)">
                好吃的汉堡
              </div>
              <div class="p-2 text-center">
                <el-button-group>
                  <el-button icon="el-icon-view" size="mini" class="p-2" @click="previewImage"></el-button>
                  <el-button icon="el-icon-edit" size="mini" class="p-2"></el-button>
                  <el-button icon="el-icon-delete" size="mini" class="p-2"></el-button>
                </el-button-group>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
    <el-dialog
      :title="editFormTitle"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editForm.name" size="medium" placeholder="请输入相册名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.order" :min="0" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上传图片"
      :visible.sync="uploadDialogVisible"
      width="30%"
    >
      <div class="text-center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import albumItem from '@/components/image/album-item'

export default {
  name: 'Photo',
  components: {
    albumItem
  },
  data () {
    return {
      previewImgs: {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        // url封面图必须再srcList中，否则第一张图片显示不出来，且第一张预览图默认时封面缩略图
        srcList: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      },
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
      },
      uploadDialogVisible: false
    }
  },
  computed: {
    editFormTitle () {
      return this.editForm.editIndex > -1 ? '编辑相册' : '创建相册'
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
