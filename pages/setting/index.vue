<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <el-form v-if="activeTabIndex === '0'" ref="form" :model="forms[activeTabIndex]" label-width="120px">
          <el-form-item label="是否允许注册">
            <el-radio-group v-model="forms[activeTabIndex].registrationAllowd" size="mini">
              <el-radio-button :label="true" border>是</el-radio-button>
              <el-radio-button :label="false" border>否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="允许注册类型">
            <el-checkbox-group
              v-model="forms[activeTabIndex].checkedRegistrationTypes"
              :min="1"
              :max="2">
              <el-checkbox v-for="(type, typeIndex) in forms[activeTabIndex].registrationTypes" :key="typeIndex" :label="typeIndex">
                {{ type }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="密码最小长度">
            <el-input-number v-model="forms[activeTabIndex].passwordLength" :min="8" :max="15" style="width: 10%">
            </el-input-number>
          </el-form-item>
          <el-form-item label="强制密码复杂度">
            <el-checkbox-group
              v-model="forms[activeTabIndex].checkedComplexity"
              :min="1"
              :max="4">
              <el-checkbox v-for="(comp, compIndex) in forms[activeTabIndex].complexity" :key="compIndex" :label="compIndex">
                {{ comp }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form v-else-if="activeTabIndex === '1'" ref="form" :model="forms[activeTabIndex]" label-width="120px">
          <el-form-item label="默认存储方式">
            <el-radio-group v-model="forms[activeTabIndex].storage" size="mini">
              <el-radio-button :label="0" border>本地</el-radio-button>
              <el-radio-button :label="1" border>七牛</el-radio-button>
              <el-radio-button :label="2" border>阿里</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Bucket">
            <el-input v-model="forms[activeTabIndex].bucket" size="mini" class="w-25"></el-input>
          </el-form-item>
          <el-form-item label="ACCESS_KEY">
            <el-input v-model="forms[activeTabIndex].accessKey" size="mini" class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="SECRET_KEY">
            <el-input v-model="forms[activeTabIndex].secretKey" size="mini" class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="域名">
            <el-input v-model="forms[activeTabIndex].domain" size="mini" class="w-25"></el-input>
            <p class="text-secondary">请补全http://或https://</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form v-else-if="activeTabIndex === '2'" ref="form" :model="forms[activeTabIndex]" label-width="120px">
          <el-form-item label="是否开启API安全">
            <el-radio-group v-model="forms[activeTabIndex].apiSecurity" size="mini">
              <el-radio-button :label="true" border>是</el-radio-button>
              <el-radio-button :label="false" border>否</el-radio-button>
            </el-radio-group>
            <p class="text-secondary">API安全功能开启之后调用前端API需要传输签名串</p>
          </el-form-item>
          <el-form-item label="密钥">
            <el-input v-model="forms[activeTabIndex].secretKey" size="mini" class="w-50"></el-input>
            <p class="text-secondary">
              密钥设置关系系统中API调用传输签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token
            </p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      tabs: [
        { name: '注册与访问' },
        { name: '上传设置' },
        { name: 'Api安全' }
      ],
      activeTabIndex: 0,
      forms: [
        {
          registrationAllowd: true,
          registrationType: 0,
          passwordLength: 8,
          passwordStrength: 0,
          complexity: ['数字', '小写字母', '大写字母', '符号'],
          checkedComplexity: [0, 1],
          registrationTypes: ['手机注册', '邮箱注册'],
          checkedRegistrationTypes: [0]
        },
        {
          storage: 0,
          bucket: '',
          accessKey: '',
          secretKey: '',
          domain: ''
        },
        {
          apiSecurity: true,
          secretKey: ''
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    },
    save () {
    }
  }
}
</script>

<style scoped>

</style>
