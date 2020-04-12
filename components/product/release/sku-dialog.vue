<template>
  <el-dialog
    title="商品规格"
    :visible.sync="skuDialogVisible"
    width="80%"
    top="6vh">
    <el-container class="position-relative" style="height: 70vh">
      <el-aside width="200px">
        <ul class="list-group list-group-flush">
          <li
            v-for="(item, index) in skuCards"
            :key="index"
            :class="activeIndex === index ? 'custom-active' : ''"
            class="list-group-item list-group-item-action"
            @click="activeIndex = index">
            {{ item.name }}
          </li>
        </ul>
      </el-aside>
      <el-header class="el-header__inner border-top border-bottom">
        <el-button type="primary" size="mini">
          {{ allSelected ? '取消全选' : '全选' }}
        </el-button>
      </el-header>
      <el-main class="el-main__inner">
        <div class="d-flex flex-wrap">
          <span
            v-for="(item, index) in skuAttrs"
            :key="index"
            :class="item.checked ? 'custom-active' : ''"
            class="border rounded py-1 px-2 m-2"
            style="cursor: pointer"
            @click="selectAttrs(item)">
            {{ item.name }}
          </span>
        </div>
      </el-main>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ImageChooseDialog',
  props: {
    // 选中最大数量限制
    selectMax: {
      type: Number,
      default: 9
    }
  },
  data () {
    return {
      skuDialogVisible: false,
      confirmCallback: null,
      activeIndex: 0,
      selectedList: [],
      skuCards: [
        {
          name: '颜色',
          type: 0, // 规格类型 0无 1颜色 2图片
          attrs: [
            {
              id: 1,
              name: '红色',
              image: '',
              color: '',
              checked: false
            },
            {
              id: 2,
              name: '绿色',
              image: '',
              color: '',
              checked: false
            },
            {
              id: 3,
              name: '蓝色',
              image: '',
              color: '',
              checked: false
            }
          ]
        },
        {
          name: '尺寸',
          type: 0, // 规格类型 S小 M中 L大
          attrs: [
            {
              id: 1,
              name: 'S',
              image: '',
              color: '',
              checked: false
            },
            {
              id: 2,
              name: 'M',
              image: '',
              color: '',
              checked: false
            },
            {
              id: 3,
              name: 'L',
              image: '',
              color: '',
              checked: false
            }
          ]
        }
      ]
    }
  },
  created () {
    this.initData()
  },
  computed: {
    skuAttrs () {
      return this.skuCards[this.activeIndex].attrs
    },
    allSelected () {
      return this.skuAttrs.length === this.selectedList.length
    }
  },
  methods: {
    initData () {
    },
    selectAttrs (item) {
      if (!item.checked) {
        this.selectedList.push(item)
        item.checked = true
      } else {
        const index = this.selectedList.findIndex(attr => attr.id === item.id)
        if (index === -1) { return }
        this.selectedList.splice(index, 1)
        item.checked = false
      }
    },
    imgSelected (item) {
      // 取消选中
      if (item.selected) {
        const index = this.imageSlectedList.findIndex(v => v.id === item.id)
        if (index === -1) {
          return
        }
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
        this.imageSlectedList.push({
          id: item.id,
          url: item.url
        })
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
    chooseSkuAttrs (confirmCallback) {
      this.confirmCallback = confirmCallback
      // this.imageDialogVisible = true
    },
    hide () {
      // this.$emit('imageDialogHide')
      this.skuDialogVisible = false
      for (const image of this.imageList) {
        image.selected = false
        image.selectOrder = 0
      }
      this.selectedList.length = 0
      this.confirmCallback = null
    },
    confirm () {
      if (this.selectedList.length > 0) {
        this.confirmCallback(this.selectedList)
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
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid #dee2e6;
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 200px;*/
  }

  .el-header__inner {
    position: absolute;
    height: 60px;
    top: 0;
    left: 200px;
    bottom: 0;
    right: 0;
  }

  .el-main__inner {
    position: absolute;
    top: 60px;
    left: 200px;
    bottom: 0;
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
