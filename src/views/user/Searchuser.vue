<template>
  <div>
    <el-card class="box-card" style="margin-top: 10px">
      <el-row>
        <el-col :span="4">
          <el-input
            type="text"
            v-model="searchKey"
            @mouseenter="handleSearch"
            size="mini"
            placeholder="根据用户昵称搜索"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            @click="handleSearch"
            icon="el-icon-search"
            size="mini">搜索</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="telephone" label="固定电话"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <!-- <el-table-column prop="password" label="密码"></el-table-column> -->
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="enabled" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" @click="handleStatus(scope.row)" type="success">正常用户</el-tag>
          <el-tag v-if="!scope.row.enabled" @click="handleStatus(scope.row)" type="danger">已封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" :disabled="!scope.row.enabled" type="primary" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <UserForm ref="userForm" />

        <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="pageSize"
      layout="->,sizes, prev, pager, next, jumper ,total"
      :total="total"
      style="margin-top: 10px"
    >
    </el-pagination>

  </div>
</template>

<script>
import UserForm from '@/views/user/addUserForm.vue'
export default {
  name: "SearchUser",
  components:{UserForm},
  data() {
    return {
      searchKey: "",
      tableData: [],
      currentPage:1,
      pageSize: 5,
      total: 0,
    };
  },
  mounted(){
    this.getUserList()
  },
  methods: {
    // 初始化用户数据
    async getUserList() {
      try {
        const res = await this.$UserApi.searchUser(
          {
            name:this.searchKey,
            page:this.currentPage,
            size:this.pageSize
            })
        this.tableData = res.data
        this.total = res.total
      } catch (error) {
        this.$message.error("初始化数据失败~")
      }
    },
    // 用户搜索
    handleSearch() {
      this.getUserList()
    },
    // 编辑用户
    async handleEdit(user){
      try {
        // 按id查询用户
        const res = await this.$UserApi.getUserById(user.id)
        if(res.status == 200) {
          res.data.password = res.data.password.replace('{noop}','')
          this.$refs.userForm.title = '更新用户'
          this.$refs.userForm.form = res.data
        }
      } catch (error) {
        this.$message.error("出错了aaaa")
      }
      this.$refs.userForm.dialogFormVisible = true
    },
        // 修改当前的页数
    handleSizeChange(e) {
      this.pageSize = e;
      this.getUserList();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getUserList();
    },
    // 修改用户状态
    async handleStatus(user){
      if(user.enabled){
        const res = await this.$UserApi.deleteUser(user.id)
        this.$confirm(`此操作将禁用该用户, 是否继续?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(res.status == 200) {
            this.$message({
              type: 'success',
              message: '已禁用该用户'
            });
            this.getUserList()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }else{
        const res = await this.$UserApi.deBlockedUser(user.id)
        this.$confirm(`此操作将解禁该用户, 是否继续?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(res.status == 200) {
            this.$message({
              type: 'success',
              message: '已禁用该用户'
            });
            this.getUserList()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
    }
  },
};
</script>

<style>
</style>