<template>
  <div class="border py-1 px-2 rounded mr-2 position-relative d-flex align-items-center">
    <div v-if="type !== 0" style="line-height: 1;">
      <!--颜色选择器-->
      <el-color-picker v-if="type === 1" :value="item.color" size="mini" class="mr-2" @change="changeColor"></el-color-picker>
      <!--图片选择-->
      <template v-else>
        <span v-if="!item.image" class="btn btn-light border p-1 mr-2" style="line-height: 1;" @click="chooseImage">
          <i class="el-icon-plus"></i>
        </span>
        <el-image v-else :src="item.image" fit="cover" @click="chooseImage"/>
      </template>
    </div>
    <el-input :value="item.name" size="mini"></el-input>
<!--    <el-input :value="item.name" size="mini" placeholder="请输入内容" @input="updateName"></el-input>-->
<!--    <span-->
<!--      class="btn btn-light p-0 position-absolute"-->
<!--      style="line-height: 1; right: -10px; top: -10px"-->
<!--      @click="delAttr">-->
<!--      <i class="el-icon-circle-close"></i>-->
<!--    </span>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SkuCardChild',
  inject: ['app'],
  props: {
    item: Object,
    indexAttr: Number,
    indexCard: Number,
    type: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      // 商品规格
      skuCards: state => state['release-product'].skuCards
    })
  },
  methods: {
    ...mapMutations({
      updateSkuCard: 'release-product/updateSkuCard',
      updateSkuAttr: 'release-product/updateSkuAttr'
    }),
    vModel (key, value) {
      this.updateSkuAttr({
        indexCard: this.indexCard,
        indexAttr: this.indexAttr,
        key,
        value
      })
    },
    delAttr () {
      // console.log(this.app)
      this.updateSkuAttr({ indexCard: this.indexCard, indexAttr: this.indexAttr, key: 'checked', value: false })
      // this.app.$refs.skuDialog.selectAttrs(this.item, this.indexAttr)
      // this.updateSkuAttr({
      //   indexCard: this.indexCard,
      //   indexAttr: this.indexAttr,
      //   key: 'checked',
      //   value: false
      // })
      // const selected = this.skuCards[this.indexCard].attrs.some(attr => attr.checked === true)
      // if (!selected) {
      //   this.updateSkuCard({ indexCard: this.indexCard, key: 'selected', value: false })
      // }
    },
    updateName (value) {
      this.vModel('name', value)
    },
    chooseImage () {
      // console.log(this.app)
      this.app.chooseImage((res) => {
        console.log('chooseImage', res[0].url)
        this.vModel('image', res[0].url)
      })
    },
    changeColor (color) {
      this.vModel('color', color)
    }
  }
}
</script>

<style scoped>
.el-image {
  width: 45px;
  height: 45px;
  cursor: pointer;
}
</style>
