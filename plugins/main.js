import Vue from 'vue'

import strophe from 'strophe.js'
import echarts from 'echarts' // 引入echarts
import $conf, { doSomething } from '@/utils/common/config'
// import { dateFilter } from '@/utils/filters/date-filter'
import '@/utils/filters/register'

doSomething()

Vue.prototype.$strophe = strophe
Vue.prototype.$echarts = echarts // 引入组件（将echarts注册为全局）
Vue.prototype.$conf = $conf
// Vue.filter('formatDate', dateFilter)
