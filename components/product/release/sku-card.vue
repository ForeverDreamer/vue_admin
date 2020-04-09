<template>
  <div class="card mb-3">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input :value="item.name" size="mini" style="width: 200px" @input="vModel(index, 'name', $event)">
        <!--<template slot="prepend">规格项：</template>-->
        <el-button slot="append" icon="el-icon-more"></el-button>
      </el-input>
      <el-radio-group :value="item.type" size="mini" class="ml-5 mb-n2 mr-auto" @input="vModel(index, 'type', $event)">
        <el-radio :label="0" border>无</el-radio>
        <el-radio :label="1" border>颜色</el-radio>
        <el-radio :label="2" border>图片</el-radio>
      </el-radio-group>
      <!--上移-->
      <el-button size="mini" icon="el-icon-top" :disabled="index === 0" @click="sortCard('moveUp', index)"></el-button>
      <!--下移-->
      <el-button size="mini" icon="el-icon-bottom" :disabled="total === index + 1" @click="sortCard('moveDown', index)"></el-button>
      <el-button size="mini" type="text" @click="delSkuCard(index)">删除</el-button>
    </div>
    <div class="card-body">
      <!--规格属性列表-->
      <div class="d-flex align-items-center flex-wrap mb-2">
        <sku-card-child :type="item.type"></sku-card-child>
      </div>
      <!--增加规格属性-->
      <el-button type="text" size="mini" icon="el-icon-plus">
        增加规格值
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import skuCardChild from '@/components/product/release/sku-card-child'

export default {
  name: 'SkuCard',
  components: {
    skuCardChild
  },
  props: {
    item: Object,
    index: Number,
    total: Number
  },
  methods: {
    ...mapMutations({
      changeState: 'release-product/changeState',
      delSkuCard: 'release-product/delSkuCard',
      vModelSkuCard: 'release-product/vModelSkuCard',
      sortSkuCard: 'release-product/sortSkuCard'
    }),
    vModel (index, key, value) {
      this.vModelSkuCard({ index, key, value })
    },
    sortCard (action, index) {
      this.sortSkuCard({ action, index })
    }
  }
}
</script>

<style scoped>

</style>
