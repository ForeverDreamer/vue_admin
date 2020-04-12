<template>
  <el-dialog
    title="商品规格"
    :visible.sync="skuDialogVisible"
    width="50%"
    center
    top="6vh">
    <el-container class="position-relative border" style="height: 50vh">
      <el-aside width="200px">
        <ul class="list-group list-group-flush">
          <li
            v-for="(item, index) in skuCards"
            :key="index"
            :class="activeIndex === index ? 'custom-active' : ''"
            class="list-group-item list-group-item-action"
            @click="changeSkuType(index)">
            {{ item.name }}
          </li>
        </ul>
      </el-aside>
<!--      <el-header class="d-flex align-items-center el-header__inner border-top border-bottom">-->
<!--        <el-button type="success" size="mini" @click="selectAll">-->
<!--          {{ allSelected ? '取消全选' : '全选' }}-->
<!--        </el-button>-->
<!--      </el-header>-->
      <el-main class="el-main__inner">
        <div class="d-flex flex-wrap">
          <span
            v-for="(item, index) in skuAttrs"
            :key="index"
            :class="item.checked ? 'custom-active' : ''"
            class="border rounded py-1 px-2 m-2"
            style="cursor: pointer"
            @click="selectAttrs(item, index)">
            {{ item.name }}
          </span>
        </div>
      </el-main>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <!--<el-button @click="cancel">取 消</el-button>-->
      <el-button type="success" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
      activeIndex: 0
      // selectedList: [],
      // selectedCards: [],
      // skuCards: [
      //   {
      //     selected: false,
      //     name: '颜色',
      //     type: 0, // 规格类型 0无 1颜色 2图片
      //     attrs: [
      //       {
      //         id: 1,
      //         name: '红色',
      //         image: '',
      //         color: '',
      //         checked: false
      //       },
      //       {
      //         id: 2,
      //         name: '绿色',
      //         image: '',
      //         color: '',
      //         checked: false
      //       },
      //       {
      //         id: 3,
      //         name: '蓝色',
      //         image: '',
      //         color: '',
      //         checked: false
      //       }
      //     ]
      //   },
      //   {
      //     selected: false,
      //     name: '尺寸',
      //     type: 0, // 规格类型 S小 M中 L大
      //     attrs: [
      //       {
      //         id: 1,
      //         name: 'S',
      //         image: '',
      //         color: '',
      //         checked: false
      //       },
      //       {
      //         id: 2,
      //         name: 'M',
      //         image: '',
      //         color: '',
      //         checked: false
      //       },
      //       {
      //         id: 3,
      //         name: 'L',
      //         image: '',
      //         color: '',
      //         checked: false
      //       }
      //     ]
      //   }
      // ]
    }
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapState({
      // 商品规格
      skuCards: state => state['release-product'].skuCards
    }),
    skuAttrs () {
      return this.skuCards[this.activeIndex].attrs
    },
    allSelected () {
      return this.skuAttrs.length === this.selectedList.length
    }
  },
  methods: {
    ...mapMutations({
      updateSkuCard: 'release-product/updateSkuCard',
      updateSkuAttr: 'release-product/updateSkuAttr'
    }),
    initData () {
    },
    changeSkuType (index) {
      // this.cancelSelected()
      this.activeIndex = index
    },
    selectAll () {
      const attrs = this.skuCards[this.activeIndex].attrs
      if (this.allSelected) {
        this.cancelSelected()
      } else {
        this.selectedList = attrs.map((attr) => {
          attr.checked = true
          return attr
        })
      }
    },
    selectAttrs (item, index) {
      if (!item.checked) {
        // this.selectedList.push(item)
        this.updateSkuCard({ indexCard: this.activeIndex, key: 'selected', value: true })
        this.updateSkuAttr({ indexCard: this.activeIndex, indexAttr: index, key: 'checked', value: true })
      } else {
        // const index = this.selectedList.findIndex(attr => attr.id === item.id)
        // if (index === -1) { return }
        // this.selectedList.splice(index, 1)
        this.updateSkuAttr({ indexCard: this.activeIndex, indexAttr: index, key: 'checked', value: false })
        const selected = this.skuAttrs.some(attr => attr.checked === true)
        if (!selected) {
          this.updateSkuCard({ indexCard: this.activeIndex, key: 'selected', value: false })
        }
      }
    },
    cancelSelected () {
      const attrs = this.skuCards[this.activeIndex].attrs
      attrs.forEach((attr) => {
        attr.checked = false
      })
      this.selectedList = []
      // 不要用这种方式清空数组，这样做不能触发computed属性
      // this.selectedList.length = 0
    },
    chooseSkuAttrs (confirmCallback, index) {
      this.confirmCallback = confirmCallback
      this.activeIndex = index
      this.skuDialogVisible = true
      // this.imageDialogVisible = true
    },
    hide () {
      this.skuDialogVisible = false
      // this.confirmCallback = null
      // this.activeIndex = 0
    },
    cancel () {
      // this.cancelSelected()
      this.hide()
    },
    confirm () {
      // const skuCard = this.skuCards[this.activeIndex]
      // if (this.selectedList.length > 0) {
      //   this.confirmCallback({
      //     name: skuCard.name,
      //     type: skuCard.type,
      //     attrs: this.selectedList
      //   })
      // }
      this.hide()
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
    top: 0;
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
