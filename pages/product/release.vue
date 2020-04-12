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
                <sku-card v-for="(item, index) in selectedCards" :key="index" :item="item" :index="index" :total="skuCardTotal"></sku-card>
                <el-button type="success" size="mini" @click="addSkuCard">选择规格</el-button>
              </el-form-item>
            </el-form>
            <el-form-item label="批量设置">
              <el-button type="text">销售价</el-button>
              <el-button type="text">市场价</el-button>
              <el-button type="text">成本价</el-button>
              <el-button type="text">库存</el-button>
              <el-button type="text">体积</el-button>
              <el-button type="text">重量</el-button>
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
        媒体设置
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
      activeTabIndex: 0,
      editorMsg: 'Welcome to Use Tinymce Editor'
    }
  },
  computed: {
    ...mapState({
      // 商品规格
      skuType: state => state['release-product'].skuType,
      skuCards: state => state['release-product'].skuCards
    }),
    selectedCards () {
      return this.skuCards.filter((card) => { return card.selected })
    },
    skuCardTotal () {
      return this.skuCards.length
    }
  },
  mounted () {},
  methods: {
    ...mapMutations({
      // addSkuCard: 'release-product/addSkuCard',
      changeState: 'release-product/changeState'
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
    }
  }
}
</script>

<style scoped>

</style>
