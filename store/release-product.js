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
    },
    {
      name: '尺寸',
      type: 0, // 规格类型 0无 1颜色 2图片
      attrs: [
        {
          name: 'S',
          image: '',
          color: ''
        },
        {
          name: 'M',
          image: '',
          color: ''
        },
        {
          name: 'L',
          image: '',
          color: ''
        }
      ]
    }
  ],
  // 表头
  ths: [
    // 不能在这里使用this，程序无法运行
    // { name: '商品规格', rowspan: this.skuCard.length > 0 ? 1 : 2, colspan: this.skuCard.length, width: '' },
    { name: '商品规格', rowspan: 1, colspan: 1, width: '' },
    { name: 'sku图片', rowspan: 2, width: '60' },
    { name: '市场价', rowspan: 2, width: '100' },
    { name: '销售价', rowspan: 2, width: '100' },
    { name: '成本价', rowspan: 2, width: '100' },
    { name: '库存', rowspan: 2, width: '100' },
    { name: '体积', rowspan: 2, width: '100' },
    { name: '重量', rowspan: 2, width: '100' },
    { name: '编码', rowspan: 2, width: '100' }
  ],
  // table数据
  tableSkusArray: [],
  tableData: []
})

export const getters = {
  validCards (state) {
    return state.skuCard.filter(card => card.attrs.length > 0)
  }
}

export const mutations = {
  // 初始化表头, 其它数据有需要也可以在这里修改
  syncTableThs (state) {
    const skuTotal = this.getters['release-product/validCards'].length
    // const skuTotal = state.skuCard.length
    state.ths[0].colspan = skuTotal
    // for (const th of state.ths) {
    //
    // }
    state.ths[0].rowspan = skuTotal > 0 ? 1 : 2
    // console.log(this)
    console.log('syncTableThs', JSON.stringify(state.ths[0]))
  },
  syncTableSkusArray (state) {
    if (state.skuCard.length === 0) {
      return []
    }
    const skus = []
    for (const card of state.skuCard) {
      if (card.attrs.length > 0) {
        skus.push(card.attrs)
      }
    }
    if (skus.length === 0) {
      return []
    }
    console.log('skus', JSON.stringify(skus))
    state.tableSkusArray = $helper.cartesianProductOf(...skus)
    console.log('tableSkusArray', JSON.stringify(state.tableSkusArray))
  },
  // 初始化表数据
  initTableData (state) {
    this.commit('release-product/syncTableSkusArray')
    // console.log('state.tableData', JSON.stringify(state.tableData))
    state.tableData = state.tableSkusArray.map((skusArr) => {
      const obj = {
        skus: skusArr,
        image: '',
        marketPrice: 0,
        salePrice: 0,
        costPrice: 0,
        inventory: 0,
        volume: 0,
        weight: 0,
        encode: ''
      }
      // console.log('obj', JSON.stringify(obj))
      return obj
    })
  },
  syncTableData (state, payload) {
    this.commit('release-product/syncTableSkusArray')
    switch (payload.action) {
      case 'delSkuCard':
        console.log('delSkuCard')
        if (state.skuCard.attrs) {
          for (const attr of state.skuCard.attrs) {
            const index = state.tableData.skus.findIndex(sku => sku.name === attr.name)
            if (index !== -1) {
              state.tableData.skus.splice(index, 1)
            }
          }
        }
        break
      case 'addSkuCard':
        console.log('addSkuCard')
        break
      case 'delSkuAttr':
        console.log('delSkuAttr')
        break
      default:
        break
    }
  },
  changeState (state, { key, value }) {
    state[key] = value
    console.log(key, value)
  },
  addSkuCard (state) {
    state.skuCard.push({
      name: '规格',
      type: 0,
      attrs: []
    })
    this.commit('release-product/syncTableThs')
    // const payload = {}
    // this.commit('release-product/initTableData', payload)
  },
  delSkuCard (state, index) {
    state.skuCard.splice(index, 1)
    this.commit('release-product/syncTableThs')
    const payload = {}
    this.commit('release-product/initTableData', payload)
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
      name: '属性',
      image: '',
      color: ''
    })
    // console.log(this)
    this.commit('release-product/syncTableThs')
    const payload = {}
    this.commit('release-product/initTableData', payload)
    console.log('addSkuAttr', JSON.stringify(state.skuCard[index].attrs))
  },
  delSkuAttr (state, { indexCard, indexAttr }) {
    console.log(indexCard, indexAttr)
    state.skuCard[indexCard].attrs.splice(indexAttr, 1)
    this.commit('release-product/syncTableThs')
    const payload = {}
    this.commit('release-product/initTableData', payload)
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
  },
  vModelTableData (state, { index, key, value }) {
    state.tableData[index][key] = value
    console.log(index, key, value)
  }
}

export const actions = {}
