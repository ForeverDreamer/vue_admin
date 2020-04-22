<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <div v-if="activeTabIndex === '0'">
          <div class="border-top border-bottom py-2 mb-3">
            <el-button type="success" size="mini" @click="addTemplate">
              添加模板
            </el-button>
          </div>
          <el-table
            border
            :data="tableData.templates"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="模板名称"
              align="center"/>
            <el-table-column
              label="计费方式"
              align="center">
              <template slot-scope="scope">
                {{ scope.row.chargeMode | formatChargeMode }}
              </template>
            </el-table-column>
            <el-table-column
              prop="order"
              label="排序"
              width="80"
              align="center"/>
            <el-table-column
              prop="createTime"
              label="添加时间"
              align="center"/>
            <el-table-column
              label="状态"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.active"
                  active-color="#13ce66"
                  inactive-color="#ff4949"/>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" plain @click="editTemplate(scope.$index, scope.row)">
                  修改
                </el-button>
                <el-button type="text" size="mini" plain @click="deleteTemplate(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form v-else ref="form" :model="form" label-width="120px">
          <el-form-item label="快递100 用户名">
            <el-input v-model="form.username" size="mini" class="w-25"></el-input>
            <p class="text-secondary">用于查询物流信息， <a href="https://www.kuaidi100.com/">快递100申请</a></p>
          </el-form-item>
          <el-form-item label="快递100 密钥">
            <el-input v-model="form.accessKey" size="mini" class="w-25"></el-input>
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
  name: 'Shipping',
  filters: {
    formatChargeMode (type) {
      const chargeModes = ['按重量', '按件数']
      return chargeModes[type]
    }
  },
  data () {
    return {
      tabs: [
        { name: '运费模板' },
        { name: '物流跟踪' }
      ],
      activeTabIndex: 0,
      form: {
        username: '',
        accessKey: ''
      },
      addTemplateForm: {},
      addTemplateDialogVisible: false,
      tableData: [],
      editIndex: -1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.resetAddTemplateForm()
      this.tableData = {
        currentPage: 1,
        templates: []
      }
      this.tableData.templates.push({
        title: '全国统一邮费',
        chargeMode: 0,
        order: 100,
        createTime: '2019-7-23 18:25:27',
        active: true
      })
    },
    resetAddTemplateForm () {
      this.addTemplateForm = {
        title: '',
        chargeMode: '',
        order: 0,
        active: false
      }
    },
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    },
    addTemplate () {
    },
    editTemplate (index, row) {
      this.addTemplateForm = {
        ...row
      }
      this.editIndex = index
      this.addTemplateDialogVisible = true
    },
    deleteTemplate (index) {
      this.$confirm('此操作将永久删除该模板，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.templates.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    close () {
      this.addTemplateDialogVisible = false
      this.resetAddTemplateForm()
    },
    confirm () {
      // console.log(this.addLevelForm)
      this.$refs.addLevelForm.validate((valid) => {
        if (valid) {
          let action = ''
          if (this.editIndex === -1) {
            action = '添加'
            this.tableData.levels.unshift({ ...this.addLevelForm })
            // console.log(this.tableData.levels)
          } else {
            action = '修改'
            const level = this.tableData.levels[this.editIndex]
            // console.log('level', level)
            level.level = this.addLevelForm.level
            level.active = this.addLevelForm.active
            level.totalConsumption = this.addLevelForm.totalConsumption
            level.times = this.addLevelForm.times
            level.discount = this.addLevelForm.discount
            this.editIndex = -1
          }
          this.close()
          this.$message({
            type: 'success',
            message: `${action}成功`
          })
        }
      })
    },
    save () {
    }
  }
}
</script>

<style scoped>

</style>
