<template>
  <el-dialog :title="title" top="5vh" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form">
      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="nameZh" :label-width="formLabelWidth">
          <el-select v-model="form.rid" placeholder="请选择">
            <el-option
              v-for="item in role"
              :key="item.rid"
              :label="item.nameZh"
              :disabled="!item.enabled"
              :value="item.rid">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item
        label="固定电话"
        prop="telephone"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.telephone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="用户名"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-input
          v-model="form.userface"
          disabled
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="
          dialogFormVisible = false;
          resetForm('form');
        "
        >取 消</el-button
      >
      <el-button type="primary" @click="handleSumit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name:'addUserForm',
  data() {
    return {
      title:'',
      dialogFormVisible: false,
      form: {
        name: "",
        rid:'',
        phone: "",
        telephone: "",
        address: "",
        username: "",
        password: "",
        userface:
          "http://bpic.588ku.com/element_pic/01/40/00/64573ce2edc0728.jpg",
        remark: ""
      },
      formLabelWidth: "120px",
      role:[]
    };
  },
  mounted(){
    this.getRoleList()
  },
  methods:{
    async handleSumit(){
      this.dialogFormVisible = false
      if(this.title == '添加用户') {
        // 添加用户
        try {
          const res =  await this.$UserApi.addUser(this.form)
          if (res.status === 200) {
            this.$message({
              type:'success',
              message:'添加成功！'
            })
            this.resetForm('form')
          }
        } catch (error) {
          this.$message.error('该用户已存在~')
        }
      }
      if(this.title == '更新用户') {
        // 更新用户
        console.log('更新用户',this.form)
        try {
          const res =  await this.$UserApi.editUser(this.form)
          if (res.status === 200) {
            this.$message({
              type:'success',
              message:'更新成功！'
            })
            this.resetForm('form')
            // 重新获取数据
            this.$parent.getUserList()
          }
        } catch (error) {
          console.log(error)
          this.$message.error('出错啦~')
        }
      }
    },
    async getRoleList(){
      const roleData = await this.$UserApi.getAllRoleList()
      this.role = roleData.data
      console.log('role列表',this.role)
    },

    // 重置 ·添加用户· 表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
};
</script>

<style>
</style>