<template>
  <div class="px-1">
    <el-tabs v-model="activeTabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
        <template v-if="activeTabIndex === '0'">
          <div class="d-flex align-items-cneter border-top border-bottom py-2 mb-3">
            <el-button type="success" size="mini" class="mr-auto">添加管理员</el-button>
            <el-input v-model="keyword" size="mini" placeholder="请输入关键字" class="w-25 mr-2">
            </el-input>
            <el-button type="info" size="mini">搜索</el-button>
          </div>
          <el-table
            border
            :data="tableData.admins.data"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              label="用户头像"
              width="120"
              align="center">
              <template slot-scope="scope">
                <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              align="center"/>
            <el-table-column
              prop="phone"
              label="手机号"
              align="center"/>
            <el-table-column
              prop="email"
              label="邮箱"
              align="center"/>
            <el-table-column
              label="所属用户组"
              align="center">
              <template slot-scope="scope">
                {{ scope.row.groupName }}
              </template>
            </el-table-column>
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
              <template>
                <el-button type="text" size="mini" plain>
                  修改
                </el-button>
                <el-button type="text" size="mini" plain>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="activeTabIndex === '1'">
          <div class="d-flex align-items-cneter border-top border-bottom py-2 mb-3">
            <el-button type="success" size="mini">添加角色</el-button>
          </div>
          <el-table
            border
            :data="tableData.groups.data"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              prop="roleName"
              label="角色名称"
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
              width="250"
              align="center">
              <template>
                <el-button type="text" size="mini" plain>修改</el-button>
                <el-button type="text" size="mini" plain>配置权限</el-button>
                <el-button type="text" size="mini" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else>
          <el-tree
            default-expand-all
            draggable
            :expand-on-click-node="false"
            :data="privileges.data"
            :props="privileges.defaultProps"
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
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      tabs: [
        { name: '管理员列表' },
        { name: '角色列表' },
        { name: '权限列表' }
      ],
      activeTabIndex: 0,
      keyword: '',
      form: {
        username: '',
        accessKey: ''
      },
      addTemplateForm: {},
      addTemplateDialogVisible: false,
      tableData: {},
      editIndex: -1,
      privileges: {
        currentPage: 1,
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
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.tableData = {
        admins: {
          currentPage: 1,
          data: []
        },
        groups: {
          currentPage: 1,
          data: []
        }
      }
      this.tableData.admins.data.push({
        id: 1,
        username: '用户名',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3917638111,1851287468&fm=26&gp=0.jpg',
        phone: '18922771919',
        email: 'test@test.com',
        groupId: 1,
        groupName: '管理员',
        active: true
      })
      this.tableData.groups.data.push({
        id: 1,
        roleName: '超级管理员',
        active: true
      })
    },
    handleClick (tab, event) {
      console.log(this.activeTabIndex)
    },
    handleNodeClick (data) {
      console.log(data)
    },
    handleNodeDrop (...args) {
      console.log(args)
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
