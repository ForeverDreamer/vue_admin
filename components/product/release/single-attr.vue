<template>
  <el-form label-width="80px">
    <el-form-item label="市场价格">
      <el-input :value="marketPrice" @input="vModel('marketPrice', $event)" type="number" placeholder="请输入商品单位" class="w-25">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input :value="salePrice" @input="vModel('salePrice', $event)" type="number" placeholder="请输入商品单位" class="w-25">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="成本价格">
      <el-input :value="costPrice" @input="vModel('costPrice', $event)" type="number" placeholder="请输入商品单位" class="w-25">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input :value="weight" @input="vModel('weight', $event)" type="number" placeholder="请输入商品单位" class="w-25">
        <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品体积">
      <el-input :value="volume" @input="vModel('volume', $event)" type="number" placeholder="请输入商品单位" class="w-25">
        <template slot="append">立方米</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SingleAttr',
  computed: {
    ...mapState({
      marketPrice: state => state['release-product'].marketPrice,
      salePrice: state => state['release-product'].salePrice,
      costPrice: state => state['release-product'].costPrice,
      weight: state => state['release-product'].weight,
      volume: state => state['release-product'].volume
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'release-product/changeState'
    }),
    vModel (key, value) {
      this.changeState({ key, value })
    }
  }
}
</script>

<style scoped>

</style>
