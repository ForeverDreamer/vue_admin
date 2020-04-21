<template>
  <div class="px-1">
    <button-search ref="buttonSearch" placeholder="要搜索的商品名称" @search="search">
      <template #left>
        <el-button type="danger" size="mini">批量删除</el-button>
      </template>
      <template v-slot:searchForm>
        <el-form ref="searchForm" :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="评价用户" class="mb-0">
            <el-input v-model="searchForm.userName" size="mini" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="评价类型" class="mb-0">
            <el-select v-model="searchForm.type" size="mini" placeholder="请选择评价类型">
              <el-option value="type1" label="类型一" />
              <el-option value="type2" label="类型二" />
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" class="mb-0">
            <el-date-picker
              v-model="searchForm.time"
              type="daterange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="40"
        align="center">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <b-media>
            <template v-slot:aside>
              <b-img :src="scope.row.coverImage" width="60" height="60" alt="placeholder" rounded="circle"></b-img>
            </template>
            <div class="mt-0 d-flex">
              <h6>{{ scope.row.userName }}</h6>
              <span class="ml-2">{{ scope.row.time }}</span>
              <el-button type="danger" size="mini" class="ml-auto">删除</el-button>
            </div>
            <p>评论内容</p>
            <b-media>
              <template v-slot:aside>
                <b-img :src="scope.row.coverImage" width="60" height="60" alt="placeholder" rounded="circle"></b-img>
              </template>
              <div class="mt-0 d-flex">
                <h6>{{ scope.row.userName }}</h6>
                <span class="ml-2">{{ scope.row.time }}</span>
                <el-button type="danger" size="mini" class="ml-auto">删除</el-button>
              </div>
              <p>回复内容</p>
            </b-media>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        width="70"
        prop="id"
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
          </b-media>
        </template>
      </el-table-column>
      <el-table-column
        label="评价信息"
        width="250">
        <template slot-scope="scope">
          <div class="d-flex flex-column">
            <p>用户名: {{ scope.row.userName }}</p>
            <div>
              <span>评分: </span>
              <el-rate
                v-model="scope.row.rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="评价时间"
        prop="time">
      </el-table-column>
      <el-table-column
        prop="show"
        label="是否显示"
        width="80"
        align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.show"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ButtonSearch from '@/components/common/button-search'

export default {
  name: 'Comment',
  components: {
    ButtonSearch
  },
  data () {
    return {
      searchForm: {
        userName: '',
        type: '',
        time: ''
      },
      tableData: [{
        id: '1',
        title: '好滋好味鸡蛋仔',
        coverImage: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3917638111,1851287468&fm=26&gp=0.jpg',
        userName: 'doer',
        rate: 4,
        time: '2019-12-12 14:15:17',
        show: true
      }]
    }
  },
  methods: {
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
      this.$refs.buttonSearch.closeAdvanceSearch()
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
