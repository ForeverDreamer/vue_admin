<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="21" :md="17" :lg="14" :xl="10">
          <el-card>
            <div slot="header">
              <h1>{{ $conf.logo }}</h1>
            </div>
            <el-form ref="ruleForm" :model="form" :rules="rules">
              <el-form-item prop="userName">
                <el-input v-model="form.userName" size="medium" placeholder="请输入用户名">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" type="password" size="medium" placeholder="请输入密码">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click.prevent="submitForm('ruleForm')">立即登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-button type="primary" @click.prevent="getData">获取首页数据测试</el-button>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  beforeCreate () {
    console.log('beforeCreate: ' + this.$store.getters.isAuthenticated)
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('/home')
    }
  },
  data () {
    return {
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(
            'authenticateUser',
            {
              username: this.form.userName,
              password: this.form.password
            })
            .then(() => {
              // this.$router.push('/home')
              // this.$axios.$get(
              //   '/product/recommends/')
              //   .then((result) => {
              //     console.log(result)
              //   })
              //   .catch(e => console.log('/product/recommends/ => ' + e))
            })
        } else {
          console.log('error submit!!')
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
  .card-header {
    height: 30px;
  }
  .el-button {
    width: 100%;
    background-color: #007A99;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
