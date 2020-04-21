<template>
  <div class="px-1">
    <div class="d-flex justify-content-end align-items-cneter border-top border-bottom py-2 mb-3">
      <el-date-picker
        v-model="searchForm.time"
        type="daterange"
        size="mini"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input v-model="searchForm.keyword" size="mini" placeholder="请输入关键字" class="w-25 mx-2">
      </el-input>
      <el-button type="info" size="mini">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="商品信息"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="商品清单"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="订单金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="收货信息"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="买家"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="交易状态">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Service',
  data () {
    return {
      searchForm: {
        keyword: '',
        time: ''
      },
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
