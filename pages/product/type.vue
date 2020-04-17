<template>
  <div class="px-1">
    <div class="d-flex align-items-cneter border-top border-bottom py-2">
      <el-button type="success" size="mini" @click="addType">添加类型</el-button>
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
        label="类型名称"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        label="属性标签"
        width="500"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.attrs | concatAttrs }}
        </template>
      </el-table-column>
      <el-table-column
        prop="order"
        label="属性排序"
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
            <el-button type="primary" size="mini" plain @click="editType(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="mini" plain @click="deleteType(scope.$index)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加类型" top="5vh" center :visible.sync="addTypeDialogVisible" width="80%">
      <el-form ref="addTypeForm" :model="addTypeForm" :rules="rules" label-width="80px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="addTypeForm.name" size="mini" class="w-25"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="addTypeForm.order" size="small" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addTypeForm.online" size="mini">
            <el-radio :label="true" border>启用</el-radio>
            <el-radio :label="false" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联规格">
          <span class="sku-list-item border rounded px-3 py-2 mr-2" style="line-height: 1;">
            <span>颜色</span>
            <i class="el-icon-delete"></i>
          </span>
          <el-button size="mini">
            <i class="el-icon-plus"></i>
          </el-button>
        </el-form-item>
        <el-form-item label="属性列表">
          <el-table
            :data="attrsTable"
            border
            style="width: 100%">
            <el-table-column
              prop="order"
              label="排序"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.order" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="属性名称"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="属性类型"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" size="mini">
                  <el-option label="输入框" value="input"></el-option>
                  <el-option label="单选框" value="radio"></el-option>
                  <el-option label="多选框" value="checkbox"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="show"
              label="是否显示"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.show"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="属性值"
              align="center">
              <template v-if="scope.row.type !== 'input'" slot-scope="scope">
                <el-input
                  v-if="scope.row.editing"
                  v-model="scope.row.value"
                  type="textarea"
                  :rows="2"
                  placeholder="每行一个规格值，多个规格值请换行输入">
                </el-input>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.type !== 'input'" type="text" size="mini" @click="editAttr(scope.$index, scope.row)">
                  {{ scope.row.editing ? '完成' : '编辑属性值' }}
                </el-button>
                <el-button type="text" size="mini" @click="deleteAttr(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="mini" icon="el-icon-plus" @click="addAttr">
            添加一个属性
          </el-button>
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
  name: 'Type',
  filters: {
    concatAttrs (attrs) {
      // const strArray = attrs.map(attr => attr.name)
      // return strArray.join(',')
      let strAttrs = ''
      attrs.forEach((attr) => {
        strAttrs = strAttrs.concat(',', attr.name)
      })
      return strAttrs.substring(1)
    }
  },
  data () {
    return {
      addTypeDialogVisible: false,
      addTypeForm: {},
      rules: {
        name: [
          { required: true, message: '类型名称不能为空', trigger: 'blur' }
        ]
      },
      tableData: [],
      attrsTable: [],
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
          typeId: i,
          name: '鞋子' + i,
          skus: [],
          attrs: [
            {
              order: 50,
              name: '属性1',
              type: 'input',
              show: true,
              value: ''
            },
            {
              order: 50,
              name: '属性2',
              type: 'input',
              show: true,
              value: ''
            }
          ],
          order: 50,
          online: true
        })
      }
      this.attrsTable = [
        {
          order: 50,
          name: '特性',
          type: 'input',
          show: true,
          value: '特性属性',
          editing: false
        },
        {
          order: 50,
          name: '前置摄像头',
          type: 'input',
          show: true,
          value: '摄像头属性',
          editing: false
        }
      ]
    },
    resetAddTypeForm () {
      this.addTypeForm = {
        name: '',
        order: 1,
        online: true,
        skus: [],
        attrs: []
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addType () {
      this.resetAddTypeForm()
      this.addTypeDialogVisible = true
    },
    batchDelele () {
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
    editType (index, row) {
      this.addTypeForm = {
        ...row
      }
      this.attrsTable = [...row.attrs]
      this.editIndex = index
      this.addTypeDialogVisible = true
    },
    deleteType (index) {
    },
    addAttr () {
      this.attrsTable.push({
        order: 50,
        name: '电池续航',
        type: 'radio',
        show: true,
        value: '',
        editing: false
      })
    },
    editAttr (index, row) {
      row.editing = !row.editing
    },
    deleteAttr (index) {
      this.attrsTable.splice(index, 1)
    },
    close () {
      this.addTypeDialogVisible = false
      this.resetAddTypeForm()
    },
    confirm () {
      // 自定义验证
      let valid = true
      const errors = []
      this.attrsTable.forEach((attr, index) => {
        if (attr.name === '') {
          valid = false
          errors.push(`第${index + 1}行: 属性名称不能为空`)
        }
        if (attr.type !== 'input' && attr.value === '') {
          valid = false
          errors.push(`第${index + 1}行: 属性值不能为空`)
        }
      })
      if (!valid) {
        let liErrors = ''
        errors.forEach((error) => {
          liErrors += `<li>${error}</li>`
        })
        return this.$notify({
          title: '属性列表错误提示：',
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: `<ul>${liErrors}</ul>`
        })
      }
      this.$refs.addTypeForm.validate((valid) => {
        if (valid) {
          let action = ''
          if (this.editIndex === -1) {
            action = '添加'
            // this.addSkuForm.options = this.addSkuForm.options.replace(/\n/g, ',')
            this.tableData.unshift({ ...this.addTypeForm })
          } else {
            action = '修改'
            const skuType = this.tableData[this.editIndex]
            console.log('skuType: ', JSON.stringify(skuType))
            console.log('this.addTypeForm: ', JSON.stringify(this.addTypeForm))
            console.log('this.attrsTable: ', JSON.stringify(this.attrsTable))
            skuType.name = this.addTypeForm.name
            skuType.order = this.addTypeForm.order
            skuType.online = this.addTypeForm.online
            skuType.skus = [...this.addTypeForm.skus]
            skuType.attrs = [...this.attrsTable]
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
  .sku-list-item:hover {
    background-color: #f4f4f4;
  }
  .sku-list-item:hover > span {
    display: none;
  }
  .sku-list-item > i {
    display: none;
    cursor: pointer;
  }
  .sku-list-item > i {
    display: inline-block;
  }

</style>
