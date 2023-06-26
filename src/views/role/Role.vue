<template>
  <div>

    <el-button type="primary" size="mini" style="margin-top:10px" @click="dialogFormVisible = true">添加岗位</el-button>

    <el-dialog title="添加岗位" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="岗位编号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" :label-width="formLabelWidth">
          <el-input v-model="form.nameZh" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSumit">确 定</el-button>
      </div>
    </el-dialog>

    <el-card class="box-card" style="margin-top: 10px">
      <el-row>
        <el-col :span="4">
          <el-input
            type="text"
            v-model="searchKey"
            @keydown.enter.native="handleSearch"
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

    <el-table :data="tableData" border style="width: 100%; margin-top: 10px">
      <el-table-column prop="rid" label="岗位编号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="岗位编码"> </el-table-column>
      <el-table-column prop="nameZh" label="岗位名称"> </el-table-column>
      <el-table-column prop="enabled" label="岗位状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.enabled === true">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.enabled === false">关闭</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#13ce66"
            @change="changeStatus(scope.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

    </el-table>
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
import _ from 'lodash'
export default {
  name: "Role",
  data() {
    return {
      tableData: [],
      value: true,
      total:0,
      pageSize: 5,
      currentPage:1,
      searchKey:'',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form:{
        name:'',
        nameZh:''
      }
    };
  },
  mounted() {
    this.getRoleList();
  },
  watch:{
    searchKey:{
      handler(){
        this.debouncedSearch()
      }
    }
  },
  methods: {
    async getRoleList() {
      const roleData = await this.$UserApi.getRoleListByPage({
        nameZh:this.searchKey,
        page:this.currentPage,
        size:this.pageSize
      });
      this.tableData = roleData.data;
      this.total = roleData.total
    },
    // 修改当前的页数
    handleSizeChange(e) {
      this.pageSize = e;
      this.getRoleList();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getRoleList();
    },
    handleSearch(){
      this.getRoleList();
    },
    // 对搜索栏进行防抖处理
    debouncedSearch: _.debounce(function() {
      this.getRoleList()
    },200),
    async changeStatus(role) {
      await this.$UserApi.updateRole(role)
    },
    async handleSumit(){
      await this.$UserApi.addRole(this.form)
      this.$message({
        type:'success',
        message:'添加成功'
      })
      this.dialogFormVisible = false
    }
  },
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>