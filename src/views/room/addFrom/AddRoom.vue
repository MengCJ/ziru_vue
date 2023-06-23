<template>
  <div>
    <el-dialog title="添加房间" :visible.sync="dialogFormVisible">
      <el-form :model="room" label-width="80px" >
        <el-form-item label="整栋名称" width="10px" >
          <el-input  v-model="room.buildingNo" placeholder="请输入楼层名称"></el-input>
        </el-form-item>
        <el-form-item label="单元号" width="10%">
          <el-input v-model="room.unitNo" placeholder="请输入单元号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间号" width="10%">
          <el-input v-model="room.roomNo" placeholder="请输入房间号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="户型" width="10%">
          <el-input v-model="room.roomType" placeholder="请输入户型" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间朝向" width="10%">
          <el-input v-model="room.roomDirection" placeholder="请输入房间朝向" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="租金" width="10%">
          <el-input v-model="room.rentFee" placeholder="请输入租金" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物业费" width="10%">
          <el-input v-model="room.propertyFee" placeholder="请输入物业费" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoomData"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddRoom",
  data() {
    return {
      room: {
        buildingNo: "",
        unitNo: "",
        roomNo: "",
        roomType: "",
        roomDirection: "",
        rentFee: "",
        propertyFee: "",
      },
      dialogFormVisible:false
    };
  },
  methods:{
    async saveRoomData(){
        this.dialogFormVisible = !this.dialogFormVisible
        const res = await this.$Api.addRoom(this.room)
        if(res.status==200){
            this.$message.success("添加成功")
            this.$parent.getRoomData()
        }
    }
  }
};
</script>

<style lang="less" scoped>
    .el-input{
        width: 300px;
    }
</style>