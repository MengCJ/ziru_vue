<template>
  <div>
    <el-dialog
      :title="room.roomId ? '更新房间' : '添加房间'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="room" label-width="80px">
        <el-form-item label="小区选择" width="10px" v-show="!room.roomId">
          <!-- <el-input  v-model="room.buildingNo" placeholder="请输入楼层名称"></el-input> -->
          <el-select v-model="room.rid" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in seleceResidence"
              :key="index"
              :label="item.name"
              :value="item.rid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整栋名称" width="10px">
          <el-input
            v-model="room.buildingNo"
            placeholder="请输入楼层名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="单元号" width="10%">
          <el-input
            v-model="room.unitNo"
            placeholder="请输入单元号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="房间号" width="10%">
          <el-input
            v-model="room.roomNo"
            placeholder="请输入房间号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="户型" width="10%">
          <el-input
            v-model="room.roomType"
            placeholder="请输入户型"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="房间朝向" width="10%">
          <el-input
            v-model="room.roomDirection"
            placeholder="请输入房间朝向"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="租金" width="10%">
          <el-input-number
            v-model="room.rentFee"
            :InputNumber="2"
            :step="0.1"
            placeholder="请输入租金"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="物业费" width="10%">
          <el-input-number
            v-model="room.propertyFee"
            placeholder="请输入物业费"
            :InputNumber="2"
            :step="0.1"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoomData">确 定</el-button>
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
        rid:''
      },
      dialogFormVisible: false,
      // 小区选择
      seleceResidence:[],
    
    };
  },
  methods: {
    async saveRoomData() {
      this.dialogFormVisible = !this.dialogFormVisible;
      const res = await this.$Api.addRoomAndupdataRoom(this.room);
      if (res.status == 200) {
        this.$message.success(res.message);
        this.$parent.getRoomData();
      }
    },
    clearRoom() {
      this.room.buildingNo = "";
      this.room.unitNo = "";
      this.room.roomNo = "";
      this.room.roomType = "";
      this.room.roomDirection = "";
      this.room.rentFee = "";
      this.room.propertyFee = "";
      this.room.rid = ""
      if(this.room.roomId){
        this.room.roomId = ""
      }
    },

    async editRoom(row) {
      const res = await this.$Api.getRoomById(row.roomId);
      if (res.status == 200) {
        this.room = res.data;
      }
      this.dialogFormVisible = true
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>