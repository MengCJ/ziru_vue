<template>
  <div>
    <el-button 
      type="primary" 
      icon="el-icon-plus" 
      size="mini"
      style="margin-top: 10px"
      @click="handleAddBtn">添加</el-button>

    <UserForm ref="userFrom" />
  </div>
</template>

<script>
import UserForm from '@/views/user/addUserForm.vue'
export default {
  name: "AddUser",
  components:{UserForm},
  mounted(){
    
  },
  methods:{
    // title 添加用户 | 更新用户
    handleAddBtn(){
      this.$refs.userFrom.title = '添加用户'
      this.$refs.userFrom.dialogFormVisible = true
    }
  }
};
</script>

<style>
</style>