<template>
  <div class="card mb-3">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input :value="item.name" size="mini" style="width: 200px" @input="vModel(item.index, 'name', $event)">
        <!--<template slot="prepend">规格项：</template>-->
        <!--<el-button slot="append" icon="el-icon-more" @click="chooseSkuAttrs"></el-button>-->
      </el-input>
      <el-radio-group :value="item.type" size="mini" class="ml-5 mb-n2 mr-auto" @input="vModel(item.index, 'type', $event)">
        <el-radio :label="0" border>
          无
        </el-radio>
        <el-radio :label="1" border>
          颜色
        </el-radio>
        <el-radio :label="2" border>
          图片
        </el-radio>
      </el-radio-group>
      <!--前端不要修改数据的顺序，会给状态数据管理带来混乱和灾难，要改通过另外的接口修改服务器数据配置-->
      <!--上移-->
      <!--<el-button size="mini" icon="el-icon-top" :disabled="index === 0" @click="sortCard('moveUp', index)" />-->
      <!--下移-->
      <!--<el-button size="mini" icon="el-icon-bottom" :disabled="total === index + 1" @click="sortCard('moveDown', index)" />-->
      <el-button size="mini" type="text" @click="delSkuCard(item.index)">
        删除
      </el-button>
    </div>
    <div class="card-body">
      <!--规格属性列表-->
      <div class="d-flex align-items-center flex-wrap mb-2">
        <sku-card-child
          v-for="(itemChild,indexAttr) in checkedSkuAttrs"
          :key="indexAttr"
          :item="itemChild"
          :index-attr="itemChild.index"
          :index-card="item.index"
          :type="item.type"/>
          <!--前端不要修改数据的顺序，会给状态数据管理带来混乱和灾难，要改通过另外的接口修改服务器数据配置-->
          <!--v-dragging="{ item: itemChild, list: syncAttrs, group: index }"-->
          <!--group好像一次绑定后就无法修改，暂时不管，反正现在也没什么用，或者在创建时addSkuCard传递group参数过去，
          item也是不知道做什么用的，用到是再去研究解决方案，实在不行就google搜一下有没有其它好用的插件库-->
      </div>
      <!--增加规格属性-->
      <el-button type="text" size="mini" icon="el-icon-plus" @click="chooseSkuAttrs(item.index)">
        选择规格属性
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SkuCardChild from '~/components/product/release/sku-card-child'

export default {
  name: 'SkuCard',
  inject: ['app'],
  components: {
    SkuCardChild
  },
  props: {
    item: Object,
    index: Number,
    total: Number
  },
  data () {
    return {
      // 通过浅拷贝：解决[vuex] do not mutate vuex store state outside mutation handlers的错误
      // attrs: this.item.attrs.slice()
      // 不需要深拷贝，因为拖拽控件只会修改数组内对象的排序，不会修改对象的数据
      // attrs: JSON.parse(JSON.stringify(this.item.attrs))
    }
  },
  computed: {
    ...mapState({
      // 商品规格
      skuCards: state => state['release-product'].skuCards
    }),
    syncAttrs () {
      return this.item.attrs.slice()
    },
    checkedSkuAttrs () {
      return this.item.attrs.filter((attr) => {
        return attr.checked === true
      })
    },
    syncSkuCardName (obj) {
      // console.log(obj.index, JSON.stringify(this.skuCards))
      // console.log(this.skuCards[obj.index].name)
      return this.skuCards[obj.index].name
      // return this.$store.state['release-product'].skuCards[index].name
    }
  },
  // watch: {
  //   attrs (val) {
  //
  //   }
  // },
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      // console.log('attrs.stringify:', typeof JSON.stringify(this.item.attrs))
      // console.log('attrs:', typeof this.attrs)
      // console.log('item:', JSON.stringify(value.item))
      // console.log('list:', JSON.stringify(value.list))
      // console.log('value:', JSON.stringify(value))
    })
    this.$dragging.$on('dragend', (e) => {
      this.sortSkuAttr({ indexCard: this.index, attrs: this.syncAttrs })
      // console.log('拖拽结束')
      // console.log(e)
      // console.log(JSON.stringify(this.skuCards))
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'release-product/changeState',
      delSkuCard: 'release-product/delSkuCard',
      vModelSkuCard: 'release-product/vModelSkuCard',
      sortSkuCard: 'release-product/sortSkuCard',
      addSkuAttr: 'release-product/addSkuAttr',
      sortSkuAttr: 'release-product/sortSkuAttr'
    }),
    vModel (index, key, value) {
      this.vModelSkuCard({ index, key, value })
    },
    sortCard (action, index) {
      this.sortSkuCard({ action, index })
    },
    chooseSkuAttrs (index) {
      // console.log(this.app)
      this.app.chooseSkuAttrs((res) => {
        console.log('chooseSkuAttrs', res)
        // this.vModel(this.index, 'name', res.name)
        // this.vModel(this.index, 'type', res.type)
        // this.vModel(this.index, 'attrs', JSON.parse(JSON.stringify(res.attrs)))
      }, index)
    }
  }
}
</script>

<style scoped>

</style>
