<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <button-search ref="buttonSearch" placeholder="请输入关键字" @search="search">
          <template #left>
            <el-button type="success" size="mini">导出数据</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
          </template>
          <template v-slot:searchForm>
            <el-form ref="searchForm" :inline="true" :model="searchForm">
              <el-form-item label="订单编号" class="mb-0">
                <el-input v-model="searchForm.orderId" size="mini" placeholder="请输入订单编号" />
              </el-form-item>
              <el-form-item label="订单状态" class="mb-0">
                <el-select v-model="searchForm.status" placeholder="请选择订单状态" size="mini">
                  <el-option label="状态1" value="status1" />
                  <el-option label="状态2" value="status2" />
                </el-select>
              </el-form-item>
              <el-form-item label="下单时间" class="mb-0">
                <el-date-picker
                  v-model="searchForm.time"
                  type="daterange"
                  size="mini"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收货人" class="mb-0">
                <el-input v-model="searchForm.receiverName" size="mini" placeholder="请输入收货人姓名" />
              </el-form-item>
              <el-form-item label="手机号" class="mb-0">
                <el-input v-model="searchForm.receiverName" size="mini" placeholder="请输入收货人手机号" />
              </el-form-item>
              <el-form-item>
                <el-button type="info" size="mini" @click="search">
                  搜索
                </el-button>
                <el-button size="mini" @click="clearAll">
                  清空筛选条件
                </el-button>
              </el-form-item>
            </el-form>
          </template>
        </button-search>
        <el-table
          :data="tableData[activeTabIndex].orders"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40"
            align="center">
          </el-table-column>
          <el-table-column
            label="商品信息"
            width="350">
            <template slot-scope="scope">
              <div class="d-flex">
                <div style="flex: 1">
                  <p class="mb-1">订单编号</p>
                  <small>4523891759321573192839758</small>
                </div>
                <div style="flex: 1">
                  <p class="mb-1">下单时间</p>
                  <small>2019-12-15 18:39:27</small>
                </div>
              </div>
              <b-media>
                <template v-slot:aside>
                  <b-img :src="scope.row.coverImage" width="60" alt="placeholder"></b-img>
                </template>
                <nuxt-link to="">
                  <h6 class="mt-0">{{ scope.row.title }}</h6>
                </nuxt-link>
                <p class="mb-1">分类：{{ scope.row.category }}</p>
                <p class="mb-0">时间：{{ scope.row.createTime }}</p>
              </b-media>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="实付款"
            align="center">
            <template>
              <span>￥20</span>
              <p>
                <small>(含运费：￥0.00)</small>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="salesVolume"
            label="买家"
            align="center">
            <template>
              <span>用户名</span>
              <p>
                <small>(用户id：11)</small>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="支付方式"
            align="center">
            <template slot-scope="scope">
              <b-badge variant="success">{{ scope.row.payment }}</b-badge>
            </template>
          </el-table-column>
          <el-table-column
            prop="expressCompany"
            label="配送方式"
            align="center">
          </el-table-column>
          <el-table-column
            label="交易状态"
            width="170"
            align="center">
            <template>
              <div>付款状态：<b-badge variant="success">已付款</b-badge></div>
              <div>发货状态：<b-badge variant="success">已发货</b-badge></div>
              <div>收货状态：<b-badge variant="success">待收货</b-badge></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="操作"
            width="150"
            align="center">
            <template>
              <el-button type="success" size="mini" plain>订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 60px"></div>
    <el-footer class="border-top d-flex align-items-center px-0 bg-white">
      <!-- Three values: flex-grow | flex-shrink | flex-basis -->
      <!-- flex: 2 2 10%; -->
      <div class="flex-grow-1 px-2">
        <el-pagination
          :current-page="tableData.currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </div>
    </el-footer>
  </div>
</template>

<script>
import ButtonSearch from '~/components/common/button-search'

export default {
  name: 'Index',
  components: {
    ButtonSearch
  },
  data () {
    return {
      tabs: [
        { name: '全部' },
        { name: '待付款' },
        { name: '待发货' },
        { name: '已发货' },
        { name: '已收货' },
        { name: '已完成' },
        { name: '已关闭' },
        { name: '退款中' }
      ],
      activeTabIndex: 0,
      searchForm: {
        orderId: '',
        status: '',
        receiverName: '',
        receiverPhone: ''
      },
      tableData: [],
      multipleSelection: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      for (let i = 0; i < this.tabs.length; i++) {
        this.tableData.push({
          currentPage: 1,
          orders: []
        })
        for (let j = 0; j < 20; j++) {
          this.tableData[i].orders.push({
            id: j,
            title: '荣耀 V10全网通 标配版 4GB+64GB 魅力红' + i + '-' + j,
            coverImage: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
            createTime: '2019-07-17 18:34:14',
            category: '手机',
            type: '普通商品',
            salesVolume: 20,
            order: 100,
            active: true,
            inventory: 999,
            payment: '微信支付',
            expressCompany: '京东快递'
          })
        }
      }
    },
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    search (param = null) {
      // 简单搜索，子组件传递字符串参数
      if (typeof param === 'string') {
        console.log('简单搜索!', param)
      } else {
        // 高级搜索，Vue默认传递$event对象
        console.log('高级搜索!', param)
      }
    },
    clearAll () {
      console.log('clearAll!')
      this.searchForm = {}
      this.$refs.buttonSearch[this.activeTabIndex].closeAdvanceSearch()
    }
  }
}
</script>

<style scoped>
  .el-footer {
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 0;
    z-index: 1;
  }
  /*.el-backtop的z-index默认是5*/
</style>
