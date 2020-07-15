<template>
  <el-container class="el-container__outer">
    <el-header class="d-flex align-items-center">
      <nuxt-link to="/" class="h5 text-light mb-0 mr-auto">{{ $conf.logo }}</nuxt-link>
      <el-menu
        default-active="0"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="headerSelect"
      >
        <nuxt-link v-for="(item, index) in navMenu.menus" :key="index" tag="el-menu-item" :to="item.url">
<!--          <el-menu-item :index="index|numToString">-->
            <!--<nuxt-link :to="item.url">{{ item.name }}</nuxt-link>-->
            {{ item.name }}
<!--          </el-menu-item>-->
        </nuxt-link>
<!--        <el-menu-item :index="index|numToString" v-for="(item, index) in navMenu.menus" :key="index">-->
<!--          &lt;!&ndash;<nuxt-link :to="item.url">{{ item.name }}</nuxt-link>&ndash;&gt;-->
<!--          {{ item.name }}-->
<!--        </el-menu-item>-->
        <el-submenu :index="userMenuIndex|numToString">
          <template slot="title">
            <el-avatar size="small" :src="navMenu.adminInfo.avatar" />
            {{ navMenu.adminInfo.name }}
          </template>
          <el-menu-item :index="userMenuIndex + '-1'">修改</el-menu-item>
          <el-menu-item :index="userMenuIndex + '-2'">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container class="el-container__inner">
      <el-aside width="200px">
        <el-menu :default-active="asideActiveIndex" @select="asideSelect">
          <el-menu-item :key="index" v-for="(item, index) in asideMenu" :index="index|numToString">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!--<li v-for="i in 100" :key="i">{{ i }}</li>-->
        </el-menu>
      </el-aside>
      <el-main class="bg-light">
        <el-container direction="vertical">
          <el-breadcrumb class="border-bottom pb-2 m-1 mb-3" separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadArray" :key="index" :to="{ path: item.path }">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <image-choose-dialog ref="imageChooseDialog" :select-max="selectMax"></image-choose-dialog>
          <sku-dialog ref="skuDialog"></sku-dialog>
          <nuxt />
        </el-container>
        <el-backtop target=".el-main" :bottom="40">
          <div class="backtop">顶</div>
        </el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import config from '~/utils/mixins/config'
// import common from '~/utils/mixins/common'
import { mapState } from 'vuex'
import ImageChooseDialog from '~/components/product/release/image-choose-dialog'
import SkuDialog from '~/components/product/release/sku-dialog'

export default {
  components: {
    ImageChooseDialog,
    SkuDialog
  },
  provide () {
    return {
      app: this
    }
  },
  // mixins: [config, common],
  middleware: ['init-auth', 'auth', 'route-guard'],
  // mixins: [common],
  data () {
    return {
      selectMax: 0,
      breadArray: [
        {
          name: '后台首页',
          path: ''
        },
        {
          name: '用户管理',
          path: ''
        },
        {
          name: '相册管理',
          path: ''
        }
      ]
    }
  },
  created () {
    console.log('default created', this.navMenu)
  },
  computed: {
    ...mapState({
      navMenu: state => state.menu.navMenu
    }),
    userMenuIndex () {
      return this.navMenu.menus.length
    },
    asideMenu () {
      return this.navMenu.menus[this.navMenu.activeIndex].submenus || []
    },
    asideActiveIndex: {
      get () {
        return this.navMenu.menus[this.navMenu.activeIndex].subActiveIndex || '0'
      },
      set (val) {
        this.$store.commit(
          'menu/changeSubmenu',
          {
            activeIndex: this.navMenu.activeIndex,
            subActiveIndex: val
          })
        // this.navMenu.menus[this.navMenu.activeIndex].subActiveIndex = val
      }
    }
  },
  methods: {
    headerSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === this.userMenuIndex + '-1') {
        this.editProfile()
        return
      } else if (key === this.userMenuIndex + '-2') {
        this.logout()
        return
      }
      this.$store.commit('menu/changeNavMenu', key)
      // this.navMenu.activeIndex = key
      // nuxt-link可点击区域仅限于文字，经常点不到，用户体验不好
      const url = this.navMenu.menus[key].url
      this.$router.push(url)
    },
    asideSelect (key, keyPath) {
      this.asideActiveIndex = key
      this.$router.push(this.asideMenu[key].url)
    },
    editProfile () {
      console.log('editProfile')
    },
    logout () {
      console.log('logout')
      this.$store.dispatch('auth/logout')
      this.$router.push('/login/')
    },
    // chooseImageconfirm (imageSlectedList) {
    //   console.log(imageSlectedList)
    // },
    chooseImage (confirmCallback, selectMax = 1) {
      this.selectMax = selectMax
      this.$refs.imageChooseDialog.chooseImage(confirmCallback)
      this.$refs.imageChooseDialog.imageDialogVisible = true
    },
    chooseSkuAttrs (confirmCallback, index = 0) {
      // this.selectMax = selectMax
      this.$refs.skuDialog.chooseSkuAttrs(confirmCallback, index)
      // this.$refs.skuDialog.skuDialogVisible = true
    }
  }
}
</script>

<style>
  html {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    /*font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',*/
    /*  Roboto, 'Helvetica Neue', Arial, sans-serif;*/
    /*font-size: 16px;*/
    /*word-spacing: 1px;*/
    /*-ms-text-size-adjust: 100%;*/
    /*-webkit-text-size-adjust: 100%;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*box-sizing: border-box;*/
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .el-dialog__body {
    padding: 0;
  }

  /*全局生效样式*/
  .el-tree-node__content {
    padding: 20px 0;
  }

  .backtop {
    /*position: absolute;*/
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }

  .el-container__outer {
    /*position: fixed;*/
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .el-container__inner {
    position: relative;
    height: 100%;
    padding-bottom: 4rem;
  }

  .el-header {
    background-color: #545c64;
  }

  .el-main {
    background-color: #E9EEF3;
  }

  /*.button--green {*/
  /*  display: inline-block;*/
  /*  border-radius: 4px;*/
  /*  border: 1px solid #3b8070;*/
  /*  color: #3b8070;*/
  /*  text-decoration: none;*/
  /*  padding: 10px 30px;*/
  /*}*/

  /*.button--green:hover {*/
  /*  color: #fff;*/
  /*  background-color: #3b8070;*/
  /*}*/

  /*.button--grey {*/
  /*  display: inline-block;*/
  /*  border-radius: 4px;*/
  /*  border: 1px solid #35495e;*/
  /*  color: #35495e;*/
  /*  text-decoration: none;*/
  /*  padding: 10px 30px;*/
  /*  margin-left: 15px;*/
  /*}*/

  /*.button--grey:hover {*/
  /*  color: #fff;*/
  /*  background-color: #35495e;*/
  /*}*/
</style>
