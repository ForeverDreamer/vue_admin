<template>
  <!--<el-row class="login-container" type="flex" justify="center" align="middle">-->
  <el-row class="login-container" type="flex" justify="center">
    <el-col :sm="16" :md="12" :lg="10" class="mt-5">
      <el-card>
        <div slot="header">
          <h1>{{ $conf.logo }}</h1>
        </div>
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" size="medium" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" size="medium" placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <!--<el-button type="primary" size="medium" @click.prevent="submitForm('loginForm')">立即登录</el-button>-->
            <el-button type="primary" size="medium" :loading="loading" @click.prevent="submitForm()">
              {{ loading ? '登录中...' : '立即登录' }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
  beforeCreate () {
    if (this.$store.getters['auth/isAuthenticated']) {
      console.log('login -> beforeCreate')
      this.$router.push('/home/')
    }
  },
  data () {
    return {
      loading: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // this.$refs['loginForm'].validate((valid) => {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch(
            'auth/authenticateUser',
            {
              username: this.form.userName,
              password: this.form.password
            })
            .then((navMenu) => {
              // console.log('submitForm', navMenu)
              this.loading = false
              this.$store.commit('menu/initNavMenu', navMenu)
              // this.$router.push('/home/')
              // this.$axios.$get(
              //   '/product/recommends/')
              //   .then((result) => {
              //     console.log(result)
              //   })
              //   .catch(e => console.log('/product/recommends/ => ' + e))
            })
        } else {
          console.log('error submit!!')
          this.loading = false
        }
      })
    },
    getData () {
      this.$axios.$get(
        '/product/recommends/')
        .then((result) => {
          console.log(result)
        })
        .catch(e => console.log('/product/recommends/ => ' + e))
    }
  },
  layout: 'login'
}
</script>

<style scoped>
  .login-container {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
  .el-col {
    border-radius: 4px;
  }
</style>
