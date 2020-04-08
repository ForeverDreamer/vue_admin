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
            <el-form-item label="添加规格">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                  规格项：
                  <el-input size="mini" style="width: 200px">
                    <!--<template slot="prepend">规格项：</template>-->
                    <el-button slot="append" icon="el-icon-more"></el-button>
                  </el-input>
                  <el-radio-group size="mini" class="ml-5 mb-n2 mr-auto">
                    <el-radio label="无" border></el-radio>
                    <el-radio label="颜色" border></el-radio>
                    <el-radio label="图片" border></el-radio>
                  </el-radio-group>
                  <el-button size="mini" icon="el-icon-top"></el-button>
                  <el-button size="mini" icon="el-icon-bottom"></el-button>
                  <el-button size="mini" type="text">删除</el-button>
                </div>
                <div class="card-body">
                  <el-button type="text" size="mini" icon="el-icon-plus">
                    增加规格值
                  </el-button>
                </div>
              </div>
              <el-button type="success" size="mini" class="mt-3">添加规格</el-button>
            </el-form-item>
            <el-form-item label="批量设置">
              <el-button type="text">销售价</el-button>
              <el-button type="text">市场价</el-button>
              <el-button type="text">成本价</el-button>
              <el-button type="text">库存</el-button>
              <el-button type="text">体积</el-button>
              <el-button type="text">重量</el-button>
            </el-form-item>
            <el-form-item label="规格设置">
              规格设置
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

export default {
  name: 'Release',
  components: { basicSetup, singleAttr },
  computed: {
    ...mapState({
      // 商品规格
      skuType: state => state['release-product'].skuType
    })
  },
  mounted () {},
  data () {
    return {
      activeTabIndex: 0
    }
  },
  methods: {
    ...mapMutations({
      changeState: 'release-product/changeState'
    }),
    vModel (key, value) {
      this.changeState({ key, value })
    },
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    }
  }
}
</script>

<style scoped>

</style>
