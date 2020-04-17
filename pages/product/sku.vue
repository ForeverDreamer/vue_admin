<template>
  <div class="px-1">
    <div class="d-flex align-items-cneter border-top border-bottom py-2">
      <el-button type="success" size="mini" @click="addSkuDialogVisible = true">添加规格</el-button>
      <el-button type="danger" size="mini" @click="batchDelele">批量删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      border
      tooltip-effect="dark"
      style="width: 100%"
      class="mt-3"
      :data="tableData"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="规格名称"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="120"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.type | skuType }}
        </template>
      </el-table-column>
      <el-table-column
        prop="options"
        label="规格值"
        width="500"
        align="center">
      </el-table-column>
      <el-table-column
        prop="order"
        label="商品排序"
        align="center">
      </el-table-column>
      <el-table-column
        prop="online"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <el-button :type="scope.row.online ? 'danger' : 'success'" size="mini" @click="toggleOnline(scope.row)">
            {{ scope.row.online ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" plain @click="editSku(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="mini" plain @click="deleteSku(scope.$index)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加规格" center :visible.sync="addSkuDialogVisible" width="40%">
      <el-form ref="addSkuForm" :model="addSkuForm" :rules="rules" label-width="80px">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="addSkuForm.name" size="mini" class="w-50"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="addSkuForm.order" size="small" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addSkuForm.online" size="mini">
            <el-radio :label="true" border>启用</el-radio>
            <el-radio :label="false" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="addSkuForm.type" size="mini">
            <el-radio :label="0" border>文字</el-radio>
            <el-radio :label="1" border>颜色</el-radio>
            <el-radio :label="2" border>类型</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="options">
          <el-input
            v-model="addSkuForm.options"
            type="textarea"
            :rows="4"
            placeholder="每行一个规格值，多个规格值请换行输入">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm(-1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  filters: {
    skuType (type) {
      let strType = ''
      switch (type) {
        case 0:
          strType = '文字'
          break
        case 1:
          strType = '颜色'
          break
        case 2:
          strType = '类型'
          break
      }
      return strType
    }
  },
  data () {
    return {
      addSkuDialogVisible: false,
      addSkuForm: {
        name: '',
        type: 0,
        order: 1,
        online: true,
        options: ''
      },
      rules: {
        name: [
          { required: true, message: '规格名称不能为空', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '规格值不能为空', trigger: 'blur' }
        ]
      },
      tableData: [],
      multipleSelection: [],
      editIndex: -1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      for (let i = 0; i < 10; i++) {
        this.tableData.push({
          skuId: i,
          name: '颜色' + i,
          type: 1,
          order: 50,
          online: true,
          // 服务端处理成字符串发过来
          options: '棕色,蓝色'
        })
      }
    },
    resetAddSkuForm () {
      this.addSkuForm = {
        name: '',
        type: 0,
        order: 1,
        online: true,
        options: ''
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    editSku (index, row) {
      this.addSkuForm = {
        name: row.name,
        type: row.type,
        order: row.order,
        online: row.online,
        options: row.options.replace(/,/g, '\n')
      }
      this.editIndex = index
      this.addSkuDialogVisible = true
    },
    deleteSku (index) {
      this.$confirm('是否删除规格项？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    batchDelele () {
      this.$confirm('是否删除所选规格项？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach((sku) => {
          const index = this.tableData.findIndex(row => row.skuId === sku.skuId)
          if (index !== -1) {
            this.tableData.splice(index, 1)
          }
        })
        this.multipleSelection = []
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    toggleOnline (row) {
      // 请求服务端修改状态
      row.online = !row.online
      // $message是elment的组件
      this.$message({
        type: row.online ? 'success' : 'warning',
        message: row.online ? '启用成功' : '禁用成功'
      })
    },
    close () {
      this.addSkuDialogVisible = false
      this.resetAddSkuForm()
    },
    confirm () {
      this.$refs.addSkuForm.validate((valid) => {
        if (valid) {
          let action = ''
          if (this.editIndex === -1) {
            action = '添加'
            this.addSkuForm.options = this.addSkuForm.options.replace(/\n/g, ',')
            this.tableData.unshift(this.addSkuForm)
          } else {
            action = '修改'
            const sku = this.tableData[this.editIndex]
            this.addSkuForm.options = this.addSkuForm.options.replace(/\n/g, ',')
            sku.name = this.addSkuForm.name
            sku.type = this.addSkuForm.type
            sku.order = this.addSkuForm.order
            sku.online = this.addSkuForm.online
            sku.options = this.addSkuForm.options
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
