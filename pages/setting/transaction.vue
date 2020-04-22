<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <template v-if="activeTabIndex === '0'">
          <el-table
            border
            :data="payments"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              label="支付方式">
              <template slot-scope="scope">
                <div class="d-flex align-items=center">
                  <b-img :src="scope.row.src" width="40" height="40" />
                  <div class="ml-2">
                    <h6 class="text-left mb-0">{{ scope.row.name }}</h6>
                    <small class="text-secondary d-block">{{ scope.row.desc }}</small>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" plain @click="config(scope.$index, scope.row)">
                  配置
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else>
          <el-form ref="orderForm" :model="orderForm" label-width="120px">
            <el-form-item label="未支付订单">
              <el-input v-model="orderForm.closeDays" type="number" size="mini" :min="0" class="w-25">
                <template slot="append">天后自动关闭</template>
              </el-input>
              <p class="text-secondary">订单下达未付款，多少天后自动关闭，设置0天不自动关闭</p>
            </el-form-item>
            <el-form-item label="已发货订单">
              <el-input v-model="orderForm.confirmDays" type="number" size="mini" :min="0" class="w-25">
                <template slot="append">天后自动确认收货</template>
              </el-input>
              <p class="text-secondary">如果在期间未确认收货，系统自动完成收货，设置0天不自动收货</p>
            </el-form-item>
            <el-form-item label="已完成订单">
              <el-input v-model="orderForm.afterSaleDays" size="mini" :min="0" class="w-25">
                <template slot="append">天后允许申请售后</template>
              </el-input>
              <p class="text-secondary">订单完成后，用户在多少天内可以发起售后申请，设置0天不允许申请售后</p>
            </el-form-item>
            <el-form-item label="运费组合策略">
              <el-select v-model="orderForm.transportCosts" size="mini" placeholder="请选择组合策略">
                <el-option label="普通会员" value="status1" />
                <el-option label="黄金会员" value="status2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">保存</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  data () {
    return {
      tabs: [
        { name: '支付设置' },
        { name: '购物设置' }
      ],
      activeTabIndex: 0,
      payments: [],
      orderForm: {},
      editIndex: -1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.payments = [
        {
          name: '支付宝支付',
          key: 'alipay',
          desc: '该系统支持即时到账接口',
          src: 'http://wxcs.niuteam.cn/addons/NsAlipay/ico.png'
        }, {
          name: '微信支付',
          key: 'wxpay',
          desc: '该系统支持微信网页支付和扫码支付',
          src: 'http://wxcs.niuteam.cn/addons/NsWeixinpay/ico.png'
        }
      ]
      this.orderForm = {
        closeDays: 1,
        confirmDays: 10,
        afterSaleDays: 30,
        transportCosts: ''
      }
    },
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    },
    config (index, row) {
    }
  }
}
</script>

<style scoped>

</style>
