import Vue from 'vue'

import $conf, { doSomething } from '@/utils/common/config'
// import { dateFilter } from '@/utils/filters/date-filter'
import '@/utils/filters/register'

doSomething()

Vue.prototype.$conf = $conf
// Vue.filter('formatDate', dateFilter)
