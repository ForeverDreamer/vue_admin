<template>
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th
          v-for="(item, index) in ths"
          :key="index"
          scope="col"
          :rowspan="item.rowspan"
          :colspan="item.colspan"
          class="text-center align-middle">
          {{ item.name }}
        </th>
      </tr>
      <tr>
        <th
          v-for="(item, index) in validCards"
          :key="index"
          scope="col"
          rowspan="1"
          colspan="1"
          class="text-center align-middle">
          {{ item.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <th v-for="(sku, skuIndex) in item.skus" :key="skuIndex" scope="row" class="text-center">
          {{ sku.name }}
        </th>
        <td class="text-center">
          <span class="btn btn-light border" style="line-height: 1;">
            <i class="el-icon-plus"></i>
          </span>
        </td>
        <td>
          <el-input type="number" :value="item.marketPrice" @input="vModel(index, 'marketPrice', $event)"></el-input>
        </td>
        <td class="text-center">
          <el-input type="number" :value="item.salePrice" @input="vModel(index, 'salePrice', $event)"></el-input>
        </td>
        <td class="text-center">
          <el-input type="number" :value="item.costPrice" @input="vModel(index, 'costPrice', $event)"></el-input>
        </td>
        <td class="text-center">
          <el-input type="number" :value="item.inventory" @input="vModel(index, 'inventory', $event)"></el-input>
        </td>
        <td class="text-center">
          <el-input type="number" :value="item.volume" @input="vModel(index, 'volume', $event)"></el-input>
        </td>
        <td class="text-center">
          <el-input type="number" :value="item.weight" @input="vModel(index, 'weight', $event)"></el-input>
        </td>
        <td class="text-center" style="width: 10%">
          <el-input type="text" :value="item.encode" @input="vModel(index, 'encode', $event)"></el-input>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SkuTable',
  computed: {
    ...mapState({
      // token: state => state.auth.token,
      skuCard: state => state['release-product'].skuCard,
      ths: state => state['release-product'].ths,
      tableData: state => state['release-product'].tableData
    }),
    ...mapGetters({
      // accessToken: 'auth/accessToken',
      // tableData: 'release-product/tableData',
      validCards: 'release-product/validCards'
    })
  },
  methods: {
    ...mapMutations({
      syncTableThs: 'release-product/syncTableThs',
      initTableData: 'release-product/initTableData',
      vModelTableData: 'release-product/vModelTableData'
    }),
    vModel (index, key, value) {
      this.vModelTableData({ index, key, value })
    }
  },
  created () {
    this.syncTableThs()
    this.initTableData()
    // console.log('tableData', JSON.stringify(this.tableData))
  },
}
</script>

<style scoped>
th {
  width: 5%;
}
</style>
