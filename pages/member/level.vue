<template>
  <div class="px-1">
    <div class="d-flex align-items-cneter border-top border-bottom py-2 mb-3">
      <el-button type="success" size="mini" @click="addLevel">
        添加等级
      </el-button>
      <div class="ml-auto">
        <span class="mr-2">选择升级标准</span>
        <el-radio-group v-model="upgradeCondition" size="mini">
          <el-radio-button :label="0">
            累计消费
          </el-radio-button>
          <el-radio-button :label="1">
            累计次数
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-dialog title="添加等级" center :visible.sync="addLevelDialogVisible" width="60%">
      <el-form ref="addLevelForm" :model="addLevelForm" label-width="80px">
        <el-form-item label="等级名称">
          <el-input v-model="addLevelForm.title" size="mini" class="w-25"></el-input>
          <small class="text-secondary d-block">
            设置会员等级名称
          </small>
        </el-form-item>
        <el-form-item label="等级">
          <el-input-number v-model="addLevelForm.level" size="small" :min="0" :max="5"></el-input-number>
          <small class="text-secondary d-block">
            设置会员等级(此参数决定等级高低，数值越大等级越高，请谨慎操作)
          </small>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="addLevelForm.active"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="升级条件">
          <div>
            <small>累计消费满 </small>
            <el-input v-model="addLevelForm.totalConsumption" size="mini" class="w-25 mx-2 align-middle">
              <template slot="append">元</template>
            </el-input>
            <small class="text-secondary">
              设置会员等级所需要的累计消费，必须大于0，单位：元
            </small>
          </div>
          <div>
            <small>累计次数满 </small>
            <el-input v-model="addLevelForm.times" size="mini" class="w-25 mx-2 align-middle">
              <template slot="append">笔</template>
            </el-input>
            <small class="text-secondary">
              设置会员等级所需要的订单数量，必须大于0，单位：笔
            </small>
          </div>
        </el-form-item>
        <el-form-item label="折扣率">
          <el-input v-model="addLevelForm.discount" size="mini" class="w-25" style="vertical-align: middle">
            <template slot="append">%</template>
          </el-input>
          <small class="text-secondary d-block">
            折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
          </small>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm(-1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      border
      :data="tableData.levels"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="会员等级"
        width="280"
        align="center"/>
      <el-table-column
        label="升级条件"
        align="center">
        <template slot-scope="scope">
          {{ getupgradeCondition.name + ': ' + scope.row[getupgradeCondition.key] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="discount"
        label="折扣率(%)"
        width="120"
        align="center"/>
      <el-table-column
        prop="level"
        label="等级序号"
        width="120"
        align="center"/>
      <el-table-column
        label="状态"
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
          <el-button type="text" size="mini" plain @click="editLevel(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button type="text" size="mini" plain @click="deleteLevel(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Level',
  data () {
    return {
      addLevelForm: {},
      addLevelDialogVisible: false,
      upgradeCondition: 0, // 0累计消费, 1累计次数
      tableData: [],
      editIndex: -1
    }
  },
  computed: {
    getupgradeCondition () {
      const conditions = [{
        name: '累计消费',
        key: 'totalConsumption'
      }, {
        name: '累计次数',
        key: 'times'
      }]
      return conditions[this.upgradeCondition]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.resetAddLevelForm()
      this.tableData = {
        currentPage: 1,
        levels: []
      }
      this.tableData.levels.push({
        id: 1,
        title: '普通会员',
        totalConsumption: 100,
        times: 10,
        discount: 10,
        level: 1,
        active: true,
        createTime: '2019-7-23 18:25:27'
      })
    },
    resetAddLevelForm () {
      this.addLevelForm = {
        title: '',
        level: '',
        active: true,
        totalConsumption: 100,
        times: 10,
        discount: 10
      }
    },
    addLevel () {
      this.resetAddLevelForm()
      this.addLevelDialogVisible = true
    },
    editLevel (index, row) {
      this.addLevelForm = {
        ...row
      }
      this.editIndex = index
      this.addLevelDialogVisible = true
    },
    deleteLevel (index) {
      this.$confirm('此操作将永久删除该等级，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.levels.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    close () {
      this.addLevelDialogVisible = false
      this.resetAddLevelForm()
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
    }
  }
}
</script>

<style scoped>

</style>
