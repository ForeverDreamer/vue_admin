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
              <el-form-item label="添加规格">
                <sku-card v-for="(item, index) in skuCard" :key="index" :item="item" :index="index" :total="skuCardTotal"></sku-card>
                <el-button type="success" size="mini" @click="addSkuCard">添加规格</el-button>
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
        商品详情
      </el-tab-pane>
      <el-tab-pane label="折扣设置">
        折扣设置
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import basicSetup from '@/components/product/release/basic-setup'
import singleAttr from '@/components/product/release/single-attr'
import skuCard from '@/components/product/release/sku-card'
import skuTable from '@/components/product/release/sku-table'

export default {
  name: 'Release',
  components: {
    basicSetup,
    singleAttr,
    skuCard,
    skuTable
  },
  data () {
    return {
      activeTabIndex: 0
    }
  },
  computed: {
    ...mapState({
      // 商品规格
      skuType: state => state['release-product'].skuType,
      skuCard: state => state['release-product'].skuCard
    }),
    skuCardTotal () {
      return this.skuCard.length
    }
  },
  mounted () {},
  methods: {
    ...mapMutations({
      changeState: 'release-product/changeState',
      addSkuCard: 'release-product/addSkuCard'
    }),
    vModel (key, value) {
      this.changeState({ key, value })
    },
    handleClick (tab, event) {
      // console.log(this.activeTabIndex)
    }
  }
}
</script>

<style scoped>

</style>
