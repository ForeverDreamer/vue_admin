<template>
  <div>
    <div class="d-flex align-items-cneter">
      <!--左边-->
      <slot name="left"></slot>
      <!--右边-->
      <slot name="right">
        <!--多加一层div，否则v-show在d-flex修饰下不生效，应该是v-show切换display属性和d-flex(display: flex)冲突-->
        <div v-show="!advanceSearch" class="ml-auto">
          <div class="d-flex align-items-cneter ml-auto">
            <el-input v-model="keyword" :placeholder="placeholder" size="mini" class="mr-2" />
            <el-button type="info" size="mini" @click="$emit('search', keyword)">搜索</el-button>
            <el-button size="mini" @click="advanceSearch = true">高级搜索</el-button>
          </div>
        </div>
      </slot>
    </div>
    <el-card v-show="advanceSearch" class="mt-3">
      <div slot="header" class="clearfix">
        <span>高级搜索</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeAdvanceSearch">
          收起
        </el-button>
      </div>
      <!--表单-->
      <slot name="searchForm"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ButtonSearch',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      keyword: '',
      advanceSearch: false
    }
  },
  methods: {
    closeAdvanceSearch () {
      this.advanceSearch = false
    }
  }
}
</script>

<style scoped>

</style>
