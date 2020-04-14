<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <basic-setup></basic-setup>
      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <!--规格选项-->
        <el-form label-width="80px">
          <el-form-item label="商品规格">
            <el-radio-group :value="skuType" @input="vModel('skuType', $event)" size="medium">
              <el-radio-button :label="0" border>单一规格</el-radio-button>
              <el-radio-button :label="1" border>多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!--单规格-->
        <template v-if="skuType === 0">
          <single-attr></single-attr>
        </template>
        <!--多规格-->
        <template v-else>
          <el-form ref="skuForm" label-width="80px">
            <el-form label-width="80px">
              <el-form-item label="规格">
                <sku-card v-for="(card, cIndex) in selectedCards" :key="cIndex" :item="card" :index="cIndex" :total="skuCardTotal"></sku-card>
                <el-button type="success" size="mini" @click="addSkuCard">选择规格</el-button>
              </el-form-item>
            </el-form>
            <el-form-item :label="batchSetup.label">
              <template v-if="batchSetup.key === ''">
                <el-button
                  v-for="(category, index) in batchSetup.categories"
                  :key="index"
                  type="text"
                  @click="batchSetupInput(category)">
                  {{ category.name }}
                </el-button>
              </template>
              <div v-else class="d-flex align-items-center">
                <el-input
                  v-model="batchSetup.value"
                  type="number"
                  size="mini"
                  class="mr-2"
                  style="width: 150px">
                </el-input>
                <el-button type="success" size="mini" @click="batchUpdate">批量修改</el-button>
                <el-button size="mini" @click="cancelBatchUpdate">取消</el-button>
              </div>
            </el-form-item>
            <el-form-item label="规格设置">
              <sku-table></sku-table>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        商品属性
      </el-tab-pane>
      <el-tab-pane label="媒体设置">
        <el-form label-width="80px">
          <el-form-item label="商品大图">
            <div class="d-flex flex-wrap">
              <div
                v-for="(image, index) in slideShowImages"
                :key="index"
                class="d-flex justify-content-center align-items-center border rounded media-setup__icon mr-3 mb-3">
                <img v-if="image.url" :src="image.url" style="width: 100%; height: 100%"/>
                <i v-else class="el-icon-plus text-muted" style="font-size: 30px;"></i>
              </div>
              <div
                v-if="slideShowImages.length < selectMax"
                class="d-flex justify-content-center align-items-center border rounded media-setup__icon mr-3 mb-3"
                @click="meadiaSetupChooseImage">
                <i class="el-icon-plus text-muted" style="font-size: 30px;"></i>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情">
        <tinymce v-model="editorMsg" ref="editor" @onClick="onClick"></tinymce>
      </el-tab-pane>
      <el-tab-pane label="折扣设置">
        折扣设置
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BasicSetup from '@/components/product/release/basic-setup'
import SingleAttr from '@/components/product/release/single-attr'
import SkuCard from '@/components/product/release/sku-card'
import SkuTable from '@/components/product/release/sku-table'
import Tinymce from '@/components/common/tinymce'

export default {
  name: 'Release',
  inject: ['app'],
  components: {
    BasicSetup,
    SingleAttr,
    SkuCard,
    SkuTable,
    Tinymce
  },
  data () {
    return {
      // 当前标签索引
      activeTabIndex: 0,
      // 富文本编辑器
      editorMsg: 'Welcome to Use Tinymce Editor',
      batchSetup: {
        // 批量设置编辑状态
        key: '',
        value: 0,
        label: '批量设置',
        // 批量设置分类
        categories: [
          { name: '市场价', key: 'marketPrice' },
          { name: '销售价', key: 'salePrice' },
          { name: '成本价', key: 'costPrice' },
          { name: '库存', key: 'inventory' },
          { name: '体积', key: 'volume' },
          { name: '重量', key: 'weight' }
        ]
      },
      selectMax: 9
    }
  },
  computed: {
    ...mapState({
      // 商品规格
      skuType: state => state['release-product'].skuType,
      skuCards: state => state['release-product'].skuCards,
      slideShowImages: state => state['release-product'].slideShowImages
    }),
    selectedCards () {
      return this.skuCards.filter((card) => { return card.selected })
    },
    skuCardTotal () {
      return this.skuCards.length
    }
    // batchSetupName () {
    //   const category = this.batchSetup.categories.find(category => category.key === this.batchSetup.key)
    //   return category.name
    // }
  },
  mounted () {},
  methods: {
    ...mapMutations({
      // addSkuCard: 'release-product/addSkuCard',
      changeState: 'release-product/changeState',
      batchUpdateTableColumn: 'release-product/batchUpdateTableColumn',
      addSlideShowImages: 'release-product/addSlideShowImages'
    }),
    vModel (key, value) {
      this.changeState({ key, value })
    },
    handleClick (tab, event) {
      // console.log(this.activeTabIndex)
    },
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    addSkuCard () {
      // console.log(this.app)
      this.app.chooseSkuAttrs((res) => {
        console.log('chooseSkuAttrs', res)
        // this.vModel(this.index, 'name', res.name)
        // this.vModel(this.index, 'type', res.type)
        // this.vModel(this.index, 'attrs', ...res.attrs)
      })
    },
    batchSetupInput (category) {
      this.batchSetup.key = category.key
      this.batchSetup.label = category.name
    },
    cancelBatchUpdate () {
      this.batchSetup.key = ''
      this.batchSetup.value = 0
      this.batchSetup.label = '批量设置'
    },
    batchUpdate () {
      this.batchUpdateTableColumn({ column: this.batchSetup.key, value: this.batchSetup.value })
      this.cancelBatchUpdate()
    },
    meadiaSetupChooseImage () {
      if (this.slideShowImages.length >= this.selectMax) {
        return
      }
      this.app.chooseImage((res) => {
        if (this.slideShowImages.length + res.length >= this.selectMax) {
          return this.$message({
            message: '总共最多选择' + this.selectMax + '张图片',
            type: 'warning'
          })
        }
        this.addSlideShowImages(JSON.parse(JSON.stringify(res)))
      }, 9)
    }
  }
}
</script>

<style scoped>
.media-setup__icon {
  width: 150px;
  height: 150px;
  cursor: pointer;
}
</style>
