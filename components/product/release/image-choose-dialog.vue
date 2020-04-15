<template>
  <el-dialog
    title="图片管理"
    :visible.sync="imageDialogVisible"
    width="80%"
    top="6vh">
    <el-container class="position-relative" style="height: 70vh">
      <el-header class="d-flex align-items-center">
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
          <el-button type="success" size="medium">
            搜索
          </el-button>
        </div>
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
              :show-options="false"
              @change="changeAlbum"/>
          </ul>
        </el-aside>
        <el-main class="el-main__inner">
          <el-row :gutter="10">
            <el-col
              v-for="(item, index) in imageList"
              :key="index"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="4">
              <el-card class="position-relative mb-3" :body-style="{ padding: '0px' }" shadow="hover" style="cursor: pointer">
                <div class="border" :class="{'border-danger': item.selected}" @click="imgSelected(item)">
                  <!--                bootstrap比加载element效率高，避免卡顿-->
                  <span v-if="item.selected" class="badge badge-danger position-absolute" style="top: 0; right: 0; z-index: 1">
                    {{ item.selectOrder }}
                  </span>
                  <div class="demo-image__preview w-100" @click.stop="">
                    <el-image
                      style="height: 100px"
                      :src="item.url"
                      :preview-src-list="item.srcList"
                      fit="fill"
                      alt="点击预览图片"
                    />
                  </div>
                  <div class="w-100 mt-n4 text-white position-absolute p-1" style="background: rgba(0,0,0,0.5)">
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="p-2 text-center">
                    <el-button-group>
                      <!--                  <el-button icon="el-icon-view" size="mini" class="p-2" @click="previewImage"></el-button>-->
                      <el-button icon="el-icon-edit" size="mini" class="p-2" @click.stop="editImage(item, index)" />
                      <el-button icon="el-icon-delete" size="mini" class="p-2" @click.stop="delImage(index)" />
                    </el-button-group>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer class="border-top d-flex align-items-center px-0">
        <div style="width: 183px" class="h-100 d-flex align-items-center justify-content-center flex-shrink-0 border-right">
          <el-button-group>
            <el-button icon="el-icon-arrow-left" size="mini">
              上一页
            </el-button>
            <el-button size="mini">
              下一页<i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </el-button-group>
        </div>
        <!-- Three values: flex-grow | flex-shrink | flex-basis -->
        <!-- flex: 2 2 10%; -->
        <div class="flex-grow-1 px-2">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-footer>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="imageDialogHide">取 消</el-button>
      <el-button type="primary" @click="imageDialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AlbumItem from '@/components/image/album-item'

export default {
  name: 'ImageChooseDialog',
  components: {
    AlbumItem
  },
  props: {
    // imageDialogVisible: {
    //   type: Boolean,
    //   default: false
    // }
    // 选中图片最大数量限制
    selectMax: {
      type: Number,
      default: 9
    }
  },
  data () {
    return {
      imageDialogVisible: false,
      confirmCallback: null,
      // url封面图必须再srcList中，否则第一张图片显示不出来，且第一张预览图默认时封面缩略图
      imageList: [],
      imageSlectedList: [],
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
      uploadDialogVisible: false,
      currentPage: 1
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
      const images = [
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931192181&di=f8f88adf580ba0fd00a8668b5cd6b4f0&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180403%2F3a46da8f2c38456582d14b2b3eaaaa68.jpeg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931192109&di=e3ff831e4a91164f2fe74b7b58f3c297&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181130%2F1a75934459394f88b75ce6303595193c.jpeg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931195227&di=dbaa4ffdfe8ba5dc316e910281335654&imgtype=0&src=http%3A%2F%2Fi3.hoopchina.com.cn%2Fhupuapp%2Fbbs%2F2407757472606%2Fthread_2407757472606_20190501225615_s_94724_w_700_h_874_44589.jpg%3Fx-oss-process%3Dimage%2Fresize%2Cw_800%2Fformat%2Cjpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931195277&di=208e821137c25e710af8e854258e9285&imgtype=0&src=http%3A%2F%2Fclub-img.kdslife.com%2Fattach%2F1k3%2Fdz%2F32%2Fpmqral-1po2.jpeg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931196151&di=e015dd8c168ed5696a46c7a7f1bfbaef&imgtype=0&src=http%3A%2F%2Fimage.uc.cn%2Fo%2Fwemedia%2Fs%2F2018%2F86e0002688e80eee57e0fb68d77a933ax640x795x47.jpeg%3B%2C4%2Cjpegx%3B3%2C700x.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931196542&di=ebf27a8cdadfa6321df3f1e52ae4502d&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw792h519%2F20180305%2Fcf1e-fxipenn3219504.png' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931197439&di=4882ba9c16566ab04ac9dac7c75de387&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa044ad345982b2b7d604647b30adcbef77099bf1.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931198040&di=ae094b1285418b08930c3da399d0b04d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180512%2Fdff3d587b8cb415eb52bcfe5f3ff9d8f.jpeg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586931198341&di=4497c5e68915b853e6b3487e9956aabf&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw966h599%2F20180123%2F9713-fyqwiqi9098405.png' },
        { url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3917638111,1851287468&fm=26&gp=0.jpg' }
      ]
      for (let i = 0; i < 10; i++) {
        this.imageList.push({
          id: i,
          name: '图片' + i,
          url: images[i].url,
          srcList: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ],
          selected: false,
          selectOrder: 0
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
    },
    editImage (item, index) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.name,
        inputValidator (value) {
          if (value === '') {
            return '图片名称不能为空'
          }
        }
      }).then(({ value }) => {
        item.name = value
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // })
      })
    },
    delImage (index) {
      this.$confirm('是否删除该图片', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imageList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    batchDelImage () {
      this.$confirm('是否删除选中的所有图片', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const leftImages = this.imageList.filter((image) => {
          return !this.imageSlectedList.some(c => c.id === image.id)
        })
        this.imageList = leftImages
        this.imageSlectedList = []
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    imgSelected (item) {
      // 取消选中
      if (item.selected) {
        const index = this.imageSlectedList.findIndex(v => v.id === item.id)
        if (index === -1) { return }
        // 如果取消选中非最后一个，重新计算选中序号
        const len = this.imageSlectedList.length
        if (index + 1 < len) {
          for (let j = index; j < len; j++) {
            const i = this.imageList.findIndex(v => v.id === this.imageSlectedList[j].id)
            if (i > -1) {
              this.imageList[i].selectOrder--
            }
          }
        }
        this.imageSlectedList.splice(index, 1)
        item.selected = false
        item.selectOrder = 0
      } else {
        // 选中
        if (this.imageSlectedList.length >= this.selectMax) {
          return this.$message({
            message: '最多选择' + this.selectMax + '张图片',
            type: 'warning'
          })
        }
        this.imageSlectedList.push({ id: item.id, url: item.url })
        item.selectOrder = this.imageSlectedList.length
        item.selected = true
      }
    },
    cancelSelected () {
      this.imageList.forEach((imageOuter) => {
        const index = this.imageSlectedList.findIndex(imageInner => imageInner.id === imageOuter.id)
        if (index > -1) {
          imageOuter.selected = false
          imageOuter.selectOrder = 0
          this.imageSlectedList.splice(index, 1)
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    chooseImage (confirmCallback) {
      this.confirmCallback = confirmCallback
      // this.imageDialogVisible = true
    },
    imageDialogHide () {
      // this.$emit('imageDialogHide')
      this.imageDialogVisible = false
      for (const image of this.imageList) {
        image.selected = false
        image.selectOrder = 0
      }
      this.imageSlectedList.length = 0
      this.confirmCallback = null
    },
    imageDialogConfirm () {
      if (this.imageSlectedList.length > 0) {
        this.confirmCallback(this.imageSlectedList)
        // this.$emit('chooseImageconfirm', this.imageSlectedList)
      }
      this.imageDialogHide()
    }
  }
}
</script>

<style scoped>
  .custom-active {
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

  .el-main__inner {
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
