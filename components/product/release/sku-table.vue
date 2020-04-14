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
          <span v-if="!item.image" class="btn btn-light border p-1 mr-2" style="line-height: 1;" @click="chooseImage(index)">
            <i class="el-icon-plus"></i>
          </span>
          <el-image v-else :src="item.image" fit="cover" @click="chooseImage(index)"/>
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
  inject: ['app'],
  computed: {
    ...mapState({
      // token: state => state.auth.token,
      skuCards: state => state['release-product'].skuCards,
      ths: state => state['release-product'].ths,
      tableData: state => state['release-product'].tableData
    }),
    ...mapGetters({
      // accessToken: 'auth/accessToken',
      // tableData: 'release-product/tableData',
      validCards: 'release-product/validCards'
    })
  },
  created () {
    this.syncTableThs()
    this.initTableData()
    // console.log('tableData', JSON.stringify(this.tableData))
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
    // chooseImage (index) {
    //   // console.log(this.app)
    //   this.app.chooseImage((res) => {
    //     this.vModel(index, 'image', res[0].url)
    //   })
    // }
  }
}
</script>

<style scoped>
th {
  width: 5%;
}

.el-image {
  width: 45px;
  height: 45px;
  cursor: pointer;
}
</style>
