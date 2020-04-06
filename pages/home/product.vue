<template>
  <div class="px-1">
    <!--标签选项卡-->
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <button-search ref="buttonSearch" placeholder="要搜索的商品名称" @search="search">
          <template v-slot:left>
            <el-button type="success" size="mini">发布商品</el-button>
            <el-button type="warning" size="mini">恢复商品</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">推荐</el-button>
          </template>
          <template v-slot:searchForm>
            <el-form ref="searchForm" :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="商品名称" class="mb-0">
                <el-input v-model="searchForm.name" size="mini" placeholder="商品名称" />
              </el-form-item>
              <el-form-item label="商品编码" class="mb-0">
                <el-input v-model="searchForm.code" size="mini" placeholder="商品编码" />
              </el-form-item>
              <el-form-item label="商品类型" class="mb-0">
                <el-select v-model="searchForm.type" placeholder="商品类型" size="mini">
                  <el-option label="类型一" value="type1" />
                  <el-option label="类型二" value="type2" />
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" class="mb-0">
                <el-input v-model="searchForm.category" size="mini" placeholder="商品分类" />
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
      </el-tab-pane>
    </el-tabs>
    <!--商品列表-->
    <el-table
      :data="tableData[activeTabIndex].products"
      border
      class="mt-3"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40"
        align="center">
      </el-table-column>
      <el-table-column
        label="商品"
        width="380"
        align="center">
        <template slot-scope="scope">
          <b-media>
            <template v-slot:aside>
              <b-img :src="scope.row.coverImage" width="60" alt="placeholder"></b-img>
            </template>

            <h6 class="mt-0">{{ scope.row.title }}</h6>
            <p class="mb-1">分类：{{ scope.row.category }}</p>
            <p class="mb-0">时间：{{ scope.row.createTime }}</p>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="商品类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="salesVolume"
        label="实际销量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="order"
        label="商品排序"
        align="center">
      </el-table-column>
      <el-table-column
        label="商品状态"
        align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" plain @click="scope.row.auditStatus = 1">
            审核通过
          </el-button>
          <el-button type="danger" size="mini" plain class="ml-0 mt-1" @click="scope.row.auditStatus = 0">
            审核不通过
          </el-button>
<!--          <el-button :type="scope.row.active ? 'danger' : 'success'" size="mini" plain @click="changeStatus(scope.row)">-->
<!--            {{ scope.row.active ? '下架' : '上架' }}-->
<!--          </el-button>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="inventory"
        label="总库存"
        align="center">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="auditStatus"
        label="操作"
        width="150"
        align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" plain>修改</el-button>
            <el-button type="danger" size="mini" plain @click="delProduct(scope.$index)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px"></div>
    <el-footer class="border-top d-flex align-items-center px-0 bg-white">
      <!-- Three values: flex-grow | flex-shrink | flex-basis -->
      <!-- flex: 2 2 10%; -->
      <div class="flex-grow-1 px-2">
        <el-pagination
          :current-page="tableData[activeTabIndex].currentPage"
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
import buttonSearch from '@/components/common/button-search'

export default {
  name: 'Product',
  components: {
    buttonSearch
  },
  data () {
    return {
      tabs: [
        { name: '审核中' },
        { name: '出售中' },
        { name: '已下架' },
        { name: '库存预警' },
        { name: '回收站' }
      ],
      activeTabIndex: 0,
      searchForm: {
        name: '',
        code: '',
        type: '',
        category: ''
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
          products: []
        })
        for (let j = 0; j < 20; j++) {
          this.tableData[i].products.push({
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
            price: 1000,
            // 0未审核 1通过 2不通过
            auditStatus: 1
          })
        }
      }
    },
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
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
      this.searchForm.name = ''
      this.searchForm.code = ''
      this.searchForm.type = ''
      this.searchForm.category = ''
      this.$refs.buttonSearch[this.activeTabIndex].closeAdvanceSearch()
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    delProduct (index) {
      this.$confirm('此操作将永久删除该文件，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData[this.activeTabIndex].products.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    changeStatus (product) {
      product.active = !product.active
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
