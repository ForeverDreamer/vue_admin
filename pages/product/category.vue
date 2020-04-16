<template>
  <div class="px-1">
    <div class="d-flex align-items-center py-2 border-bottom">
      <el-button type="primary" size="mini" @click="createTopCategory">
        创建顶级分类
      </el-button>
    </div>
    <el-tree
      default-expand-all
      draggable
      :expand-on-click-node="false"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      @node-drop="handleNodeDrop">
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <div>
          <!--value时单项绑定，v-model是双向绑定，两者不一样，注意区分使用-->
          <el-input v-if="data.editing" v-model="data.label" size="mini"></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button :type="data.show ? 'primary' : 'danger'" size="mini" @click.stop="display(node, data)">
            {{ data.show ? '显示' : '隐藏' }}
          </el-button>
          <el-button type="success" size="mini" @click.stop="append(data)">增加</el-button>
          <el-button :type="data.editing ? 'default' : 'warning'" size="mini" @click.stop="edit(data)">
            {{ data.editing ? '完成' : '修改' }}
          </el-button>
          <el-button type="danger" size="mini" @click.stop="() => remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000

export default {
  name: 'Category',
  data () {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        show: true,
        editing: false,
        children: [{
          id: 2,
          label: '二级 1-1',
          show: true,
          editing: false,
          children: [{
            id: 3,
            label: '三级 1-1-1',
            show: true,
            editing: false
          }]
        }]
      }, {
        id: 4,
        label: '一级 2',
        show: true,
        editing: false,
        children: [{
          id: 5,
          label: '二级 2-1',
          show: true,
          editing: false,
          children: [{
            id: 6,
            label: '三级 2-1-1',
            show: true,
            editing: false
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    handleNodeDrop (...args) {
      console.log(args)
    },
    createTopCategory () {
      this.$prompt('请输入顶级分类名称', '提示', {
        confirmButtonText: '创建',
        cancelButtonText: '取消',
        inputValidator (value) {
          if (value === null) {
            return '顶级分类名称不能为空'
          }
          value = value.replace(/\s*/g, '')
          if (value === '') {
            return '顶级分类名称不能为空'
          }
          return true
        }
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {})
    },
    append (data) {
      const newChild = { id: id++, label: '新增分类', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove (node, data) {
      this.$confirm(`是否删除"${node.label}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    display (node, data) {
      console.log('node', node)
      console.log('data', data)
      data.show = !data.show
    },
    edit (data) {
      data.editing = !data.editing
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
