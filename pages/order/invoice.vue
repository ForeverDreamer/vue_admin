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
        label="订单编号"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="开票金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="抬头"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="发票内容"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="纳税人识别号">
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
  name: 'Invoice',
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
