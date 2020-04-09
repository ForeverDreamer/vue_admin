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
      list: []
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
      list: []
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
  }
}

export const actions = {}
