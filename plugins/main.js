import Vue from 'vue'

import $conf from '@/utils/common/config'
import { dateFilter } from '@/utils/filters/date-filter'

Vue.prototype.$conf = $conf
Vue.filter('formatDate', dateFilter)
