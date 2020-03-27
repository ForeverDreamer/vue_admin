<template>
  <div>
    <el-row>
      <el-col :span="6" v-for="(item, index) in statisticalType" :key="index">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <i :class="[item.icon, item.color]" class="h4 text-white text-center card-icon__size mr-3 mb-0"></i>
            <div class="card-info__size">
              <h4 class="text-left mb-0">{{ item.count }}</h4>
              <h7 class="text-muted">{{ item.desc }}</h7>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      statisticalType: [
        { icon: 'el-icon-user-solid', color: 'bg-primary', count: 30, desc: '关注人数(个)' },
        { icon: 'el-icon-s-finance', color: 'bg-success', count: 120, desc: '订单总数(笔)' },
        { icon: 'el-icon-s-order', color: 'bg-danger', count: 4183.80, desc: '今日订单总金额(元)' },
        { icon: 'el-icon-s-data', color: 'bg-warning', count: 100, desc: '本月销量(笔)' }
      ]
    }
  }
}
</script>

<style scoped>
  .card-icon__size {
    width: 3rem;
    line-height: 3rem;
  }
  .card-info__size {
    line-height: 2rem;
  }
</style>
