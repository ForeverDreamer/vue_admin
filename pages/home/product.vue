<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <div class="d-flex align-items-cneter">
          <el-button type="success" size="mini">
            发布商品
          </el-button>
          <el-button type="success" size="mini">
            批量删除
          </el-button>
          <!--多加一层div，否则v-show在d-flex修饰下不生效，应该时v-show切换display属性和d-flex(display: flex)冲突-->
          <div v-show="!searchForm.advanceSerch" class="ml-auto">
            <div class="d-flex align-items-cneter ml-auto">
              <el-input v-model="searchForm.keyword" placeholder="要搜索的商品名称" size="mini" class="mr-2" />
              <el-button type="info" size="mini">
                搜索
              </el-button>
              <el-button size="mini" @click="searchForm.advanceSerch = true">
                高级搜索
              </el-button>
            </div>
          </div>
        </div>
        <el-card v-show="searchForm.advanceSerch" class="mt-3">
          <div slot="header" class="clearfix">
            <span>高级搜索</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="searchForm.advanceSerch = false">
              收起
            </el-button>
          </div>
          <div>
            搜索表单
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Product',
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
        keyword: '',
        advanceSerch: false
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    }
  }
}
</script>

<style scoped>

</style>
