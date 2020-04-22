<template>
  <div class="px-1">
    <button-search ref="buttonSearch" placeholder="手机号/邮箱/会员昵称" @search="search">
      <template #left>
        <el-button type="success" size="mini" @click="addMember">添加会员</el-button>
      </template>
      <template v-slot:searchForm>
        <el-form ref="searchForm" :inline="true" :model="searchForm">
          <el-form-item label="搜索内容" class="mb-0">
            <el-input v-model="searchForm.keyword" size="mini" placeholder="手机号/邮箱/会员昵称" />
          </el-form-item>
          <el-form-item label="会员等级" class="mb-0">
            <el-select v-model="searchForm.level" placeholder="请选择会员等级" size="mini">
              <el-option label="等级1" value="status1" />
              <el-option label="等级2" value="status2" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间" class="mb-0">
            <el-date-picker
              v-model="searchForm.time"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="info" size="mini" @click="search">
              搜索
            </el-button>
            <el-button size="mini" @click="clearAll">
              清空筛选条件
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </button-search>
    <el-dialog title="添加会员" center :visible.sync="addMemberDialogVisible" width="40%">
      <el-form ref="addMemberForm" :model="addMemberForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addMemberForm.username" size="mini" class="w-25"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addMemberForm.password" size="mini" class="w-25"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addMemberForm.nickname" size="mini" class="w-25"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <span v-if="!addMemberForm.headImage" class="btn btn-light border p-1 mr-2" style="line-height: 1;" @click="chooseImage">
            <i class="el-icon-plus p-2"></i>
          </span>
          <b-img v-else :src="addMemberForm.headImage" width="60" height="60" @click="chooseImage" />
        </el-form-item>
        <el-form-item label="等级" class="mb-0">
          <el-select v-model="searchForm.level" size="mini" placeholder="请选择会员等级">
            <el-option label="普通会员" value="status1" />
            <el-option label="黄金会员" value="status2" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addMemberForm.phone" size="mini" class="w-25"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addMemberForm.email" size="mini" class="w-25"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addMemberForm.gender" size="mini">
            <el-radio-button :label="0" border>保密</el-radio-button>
            <el-radio-button :label="1" border>男生</el-radio-button>
            <el-radio-button :label="2" border>女生</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="addMemberForm.active"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm(-1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      border
      :data="tableData.members"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        label="会员"
        width="280">
        <template slot-scope="scope">
          <b-media>
            <template v-slot:aside>
              <b-img :src="scope.row.headImage" width="60" height="60" alt="placeholder" rounded="circle"></b-img>
            </template>
            <div>
              <div class="d-flex">
                <h6 class="mr-auto">{{ scope.row.username }}</h6>
                <el-button type="text" size="mini">详情</el-button>
              </div>
              <p>用户id: {{ scope.row.id }}</p>
            </div>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="会员等级"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        label="登录/注册"
        align="center">
        <template slot-scope="scope">
          <p>注册时间: {{ scope.row.registerTime }}</p>
          <div>最后登录: {{ scope.row.lastLoginTime }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.active"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="text" size="mini" plain @click="editMember(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="mini" plain class="mx-1">重置密码</el-button>
            <el-button type="text" size="mini" plain @click="deleteMember(scope.$index)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px"></div>
    <el-footer class="border-top d-flex align-items-center px-0 bg-white">
      <!-- Three values: flex-grow | flex-shrink | flex-basis -->
      <!-- flex: 2 2 10%; -->
      <div class="flex-grow-1 px-2">
        <el-pagination
          :current-page="tableData.currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </div>
    </el-footer>
  </div>
</template>

<script>
import ButtonSearch from '@/components/common/button-search'

export default {
  name: 'Index',
  inject: ['app'],
  components: {
    ButtonSearch
  },
  data () {
    return {
      addMemberForm: {},
      addMemberDialogVisible: false,
      searchForm: {},
      tableData: [],
      editIndex: -1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.resetAddMemberForm()
      this.resetSearchForm()
      this.tableData = {
        currentPage: 1,
        members: []
      }
      this.tableData.members.push({
        id: 1,
        username: '用户名',
        headImage: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3917638111,1851287468&fm=26&gp=0.jpg',
        registerTime: '2019-07-24 15:52:56',
        lastLoginTime: '2019-07-24 15:52:56',
        level: '普通用户',
        active: true
      })
    },
    resetAddMemberForm () {
      this.addMemberForm = {
        username: '',
        password: '',
        nickname: '',
        headImage: '',
        level: '',
        phone: '',
        email: '',
        gender: '',
        active: true
      }
    },
    resetSearchForm () {
      this.searchForm = {
        keyword: '',
        level: '',
        time: ''
      }
    },
    addMember () {
      this.resetAddMemberForm()
      this.addMemberDialogVisible = true
    },
    editMember (index, row) {
      this.addMemberForm = {
        ...row
      }
      this.editIndex = index
      this.addMemberDialogVisible = true
    },
    deleteMember (index) {
      this.$confirm('此操作将永久删除该会员，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.members.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    search (param = null) {
      // 简单搜索，子组件传递字符串参数
      if (typeof param === 'string') {
        console.log('简单搜索!', param)
      } else {
        // 高级搜索，Vue默认传递$event对象
        console.log('高级搜索!', param)
      }
      this.resetSearchForm()
    },
    clearAll () {
      console.log('clearAll!')
      this.resetSearchForm()
      this.$refs.buttonSearch.closeAdvanceSearch()
    },
    chooseImage () {
      // console.log(this.app)
      this.app.chooseImage((res) => {
        console.log('chooseImage', res[0].url)
        this.addMemberForm.headImage = res[0].url
      })
    },
    close () {
      this.addMemberDialogVisible = false
      this.resetAddMemberForm()
    },
    confirm () {
      // console.log(this.addMemberForm)
      this.$refs.addMemberForm.validate((valid) => {
        if (valid) {
          let action = ''
          if (this.editIndex === -1) {
            action = '添加'
            const extraData = {
              id: 2,
              registerTime: '2019-07-24 15:52:56',
              lastLoginTime: '2019-07-24 15:52:56'
            }
            this.tableData.members.unshift({ ...extraData, ...this.addMemberForm })
            // console.log(this.tableData.members)
          } else {
            action = '修改'
            const member = this.tableData.members[this.editIndex]
            member.username = this.addMemberForm.username
            member.password = this.addMemberForm.password
            member.nickname = this.addMemberForm.nickname
            member.headImage = this.addMemberForm.headImage
            member.level = this.addMemberForm.level
            member.phone = this.addMemberForm.phone
            member.email = this.addMemberForm.email
            member.gender = this.addMemberForm.gender
            member.active = this.addMemberForm.active
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
  .el-footer {
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 0;
    z-index: 1;
  }
  /*.el-backtop的z-index默认是5*/
</style>
