import $helper from '@/utils/common/helper'

export const state = () => ({
  // 基础设置
  name: '',
  desc: '',
  unit: '',
  inventory: 0,
  inventoryAlert: 0,
  inventoryDisplay: 0,
  active: 0,
  freightTemplate: '',
  category: [],
  // 商品规格
  skuType: 0,
  marketPrice: 0,
  salePrice: 0,
  costPrice: 0,
  weight: 0,
  volume: 0,
  skuCard: [
    {
      name: '颜色',
      type: 0, // 规格类型 0无 1颜色 2图片
      attrs: [
        {
          name: '红色',
          image: '',
          color: ''
        },
        {
          name: '绿色',
          image: '',
          color: ''
        },
        {
          name: '蓝色',
          image: '',
          color: ''
        }
      ]
    }
  ]
})

export const getters = {}

export const mutations = {
  changeState (state, { key, value }) {
    state[key] = value
    console.log(key, value)
  },
  addSkuCard (state) {
    state.skuCard.push({
      name: '规格名称',
      type: 0,
      attrs: []
    })
  },
  delSkuCard (state, index) {
    state.skuCard.splice(index, 1)
  },
  vModelSkuCard (state, { index, key, value }) {
    state.skuCard[index][key] = value
    console.log(index, key, value)
  },
  sortSkuCard (state, { action, index }) {
    $helper[action](state.skuCard, index)
  },
  addSkuAttr (state, index) {
    state.skuCard[index].attrs.push({
      name: '规格名称',
      image: '',
      color: ''
    })
    console.log('addSkuAttr', JSON.stringify(state.skuCard[index].attrs))
  },
  delSkuAttr (state, { indexCard, indexAttr }) {
    console.log(indexCard, indexAttr)
    state.skuCard[indexCard].attrs.splice(indexAttr, 1)
  },
  updateSkuAttr (state, { indexCard, indexAttr, key, value }) {
    console.log(indexCard, indexAttr, key, value)
    state.skuCard[indexCard].attrs[indexAttr][key] = value
  },
  sortSkuAttr (state, { indexCard, attrs }) {
    // console.log('--------------------------')
    // console.log(indexCard, JSON.stringify(attrs))
    // console.log(JSON.stringify(state.skuCard[indexCard].attrs))
    // slice()浅拷贝，避免组件和vuex的数据指针一样，报[vuex] do not mutate vuex store state outside mutation handlers的错误
    // 性能也比深拷贝高得多
    state.skuCard[indexCard].attrs = attrs.slice()
    // state.skuCard[indexCard].attrs.length = 0
    // for (const attr of attrs) {
    //   state.skuCard[indexCard].attrs.push(attr)
    // }
    // console.log(JSON.stringify(state.skuCard[indexCard].attrs))
  }

}

export const actions = {}
