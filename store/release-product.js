import $helper from '~/utils/common/helper'

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
  // 可选规格数据由后端服务器配置，页面初始化时请求保存到Vuex
  skuCards: [
    {
      index: 0,
      selected: false,
      name: '颜色',
      type: 0, // 规格类型 0无 1颜色 2图片
      attrs: [
        {
          index: 0,
          name: '颜色0',
          image: '',
          color: '',
          checked: false
        },
        {
          index: 1,
          name: '颜色1',
          image: '',
          color: '',
          checked: false
        },
        {
          index: 2,
          name: '颜色2',
          image: '',
          color: '',
          checked: false
        }
      ]
    },
    {
      index: 1,
      selected: false,
      name: '尺寸',
      type: 0, // 规格类型 S小 M中 L大
      attrs: [
        {
          index: 0,
          name: 'S',
          image: '',
          color: '',
          checked: false
        },
        {
          index: 1,
          name: 'M',
          image: '',
          color: '',
          checked: false
        },
        {
          index: 2,
          name: 'L',
          image: '',
          color: '',
          checked: false
        }
      ]
    }
  ],
  // 表头
  ths: [
    // 不能在这里使用this，程序无法运行
    // { name: '商品规格', rowspan: this.skuCards.length > 0 ? 1 : 2, colspan: this.skuCard.length, width: '' },
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
  tableData: [],
  // 媒体设置
  // 商品详情页轮播大图
  carouselImages: [],
  // 商品属性
  productAttribute: {
    // 商品类型
    type: '',
    // 商品属性
    attrs: {
      // 型号
      model: ''
    }
  },
  // 折扣设置
  discount: 0
})

export const getters = {
  validCards (state) {
    return state.skuCards.filter(card => card.selected)
  }
}

export const mutations = {
  // 初始化表头, 其它数据有需要也可以在这里修改
  syncTableThs (state) {
    const skuTotal = this.getters['release-product/validCards'].length
    // const skuTotal = state.skuCards.length
    state.ths[0].colspan = skuTotal > 0 ? skuTotal : 1
    // for (const th of state.ths) {
    //
    // }
    state.ths[0].rowspan = skuTotal > 0 ? 1 : 2
    // console.log(this)
    console.log('syncTableThs', JSON.stringify(state.ths[0]))
  },
  syncTableSkusArray (state) {
    if (state.skuCards.length === 0) {
      state.tableSkusArray = []
      return
    }
    const skuAttrsArray = []
    for (const card of state.skuCards) {
      if (card.selected) {
        skuAttrsArray.push(card.attrs.filter(attr => attr.checked === true))
      }
    }
    if (skuAttrsArray.length === 0) {
      state.tableSkusArray = []
      return
    }
    // console.log('skus', JSON.stringify(tableSkusArray))
    state.tableSkusArray = $helper.cartesianProductOf(...skuAttrsArray)
  },
  // 初始化表数据
  initTableData (state) {
    this.commit('release-product/syncTableSkusArray')
    // console.log('state.tableData', JSON.stringify(state.tableData))
    if (state.tableSkusArray.length === 0) {
      state.tableData = []
      return
    }
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
  // 批量修改表数据列
  batchUpdateTableColumn (state, { column, value }) {
    for (const row of state.tableData) {
      row[column] = value
    }
  },
  // syncTableData (state, payload) {
  //   this.commit('release-product/syncTableSkusArray')
  //   switch (payload.action) {
  //     case 'delSkuCard':
  //       console.log('delSkuCard')
  //       if (state.skuCards.attrs) {
  //         for (const attr of state.skuCards.attrs) {
  //           const index = state.tableData.skus.findIndex(sku => sku.name === attr.name)
  //           if (index !== -1) {
  //             state.tableData.skus.splice(index, 1)
  //           }
  //         }
  //       }
  //       break
  //     case 'addSkuCard':
  //       console.log('addSkuCard')
  //       break
  //     case 'delSkuAttr':
  //       console.log('delSkuAttr')
  //       break
  //     default:
  //       break
  //   }
  // },
  changeState (state, { key, value }) {
    state[key] = value
    // console.log(key, value)
  },
  updateSkuCard (state, { indexCard, key, value }) {
    state.skuCards[indexCard][key] = value
    this.commit('release-product/syncTableThs')
    // this.commit('release-product/syncTableThs')
    // const payload = {}
    // this.commit('release-product/initTableData', payload)
  },
  delSkuCard (state, indexCard) {
    console.log('delSkuCard')
    state.skuCards[indexCard].selected = false
    console.log(JSON.stringify(state.skuCards[indexCard].attrs))
    for (const attr of state.skuCards[indexCard].attrs) {
      console.log(JSON.stringify(attr))
      attr.checked = false
    }
    this.commit('release-product/syncTableThs')
    this.commit('release-product/initTableData')
  },
  vModelSkuCard (state, { index, key, value }) {
    state.skuCards[index][key] = value
    // console.log(index, key, value)
  },
  sortSkuCard (state, { action, index }) {
    $helper[action](state.skuCards, index)
    for (const rowData of state.tableData) {
      $helper[action](rowData.skus, index)
    }
  },
  // addSkuAttr (state, { index, key, value }) {
  //   state.skuCards[index].attrs[key] = value
  //   // console.log(this)
  //   this.commit('release-product/syncTableThs')
  //   const payload = {}
  //   this.commit('release-product/initTableData', payload)
  //   console.log('addSkuAttr', JSON.stringify(state.skuCards[index].attrs))
  // },
  // delSkuAttr (state, { indexCard, indexAttr }) {
  //   // console.log(indexCard, indexAttr)
  //   state.skuCards[indexCard].attrs.splice(indexAttr, 1)
  //   this.commit('release-product/syncTableThs')
  //   const payload = {}
  //   this.commit('release-product/initTableData', payload)
  // },
  updateSkuAttr (state, { indexCard, indexAttr, key, value }) {
    console.log(indexCard, indexAttr, key, value)
    const attrs = state.skuCards[indexCard].attrs
    attrs[indexAttr][key] = value
    const selected = attrs.some(attr => attr.checked === true)
    if (!selected) {
      this.commit('release-product/updateSkuCard', { indexCard, key: 'selected', value: false })
    }
    this.commit('release-product/initTableData')
  },
  sortSkuAttr (state, { indexCard, attrs }) {
    // console.log('--------------------------')
    // console.log(indexCard, JSON.stringify(attrs))
    // console.log(JSON.stringify(state.skuCards[indexCard].attrs))
    // slice()浅拷贝，避免组件和vuex的数据指针一样，报[vuex] do not mutate vuex store state outside mutation handlers的错误
    // 性能也比深拷贝高得多
    state.skuCards[indexCard].attrs = attrs.slice()
    // state.skuCards[indexCard].attrs.length = 0
    // for (const attr of attrs) {
    //   state.skuCards[indexCard].attrs.push(attr)
    // }
    // console.log(JSON.stringify(state.skuCards[indexCard].attrs))
  },
  vModelTableData (state, { index, key, value }) {
    console.log('vModelTableData', state.tableData)
    console.log(index, key, value)
    state.tableData[index][key] = value
  },
  addCarouselImages (state, images) {
    state.carouselImages = state.carouselImages.concat(images)
    // state.carouselImages = [...state.carouselImages, ...images]
  },
  updateCarouselImage (state, { index, image }) {
    state.carouselImages.splice(index, 1, image)
    // 不能这样做，界面不会自动刷新
    // state.carouselImages[index] = image
  },
  delCarouselImage (state, index) {
    state.carouselImages.splice(index, 1)
  },
  productAttributeUpdateType (state, value) {
    console.log('productAttributeUpdateType', value)
    state.productAttribute.type = value
  },
  productAttributeUpdateAttr (state, { key, value }) {
    console.log('productAttributeUpdateAttr', key, value)
    state.productAttribute.attrs[key] = value
  }
}

export const actions = {}
