import Vue from 'vue'

// import { dateFilter } from '~/utils/filters/date-filter'
import { dateFilter as df } from '~/utils/filters/date-filter'
import * as stringFilter from '~/utils/filters/string-filter'

Vue.filter('formatDate', df)
Vue.filter('numToString', stringFilter.numToString)
