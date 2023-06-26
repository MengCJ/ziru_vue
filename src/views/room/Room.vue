<template>
  <div class="room">
    <div>
      <el-card class="box-card" >
        所属小区
        <el-select
          v-model="sreach.rid"
          clearable
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="(item, index) in residenceName"
            :key="index"
            :label="item.name"
            :value="item.rid"
          >
          </el-option>
        </el-select>
        户型
        <el-input
          size="mini"
          placeholder="请输入户型"
          v-model="sreach.roomType"
          style="margin: 0 10px"
          clearable
        ></el-input>
        租金范围
        <el-form ref="form" :model="sreach" :rules="rules" style="display: flex; display: inline-block;">
          <el-form-item prop="minrentFee" style="display: inline-block; margin: 0;">
            <el-input v-model.number="sreach.minrentFee" style="width:100px" size="mini"/>
          </el-form-item>
          ~
          <el-form-item prop="maxrentFee" style="display: inline-block;margin: 0;">
            <el-input v-model.number="sreach.maxrentFee" style="width:100px" size="mini"/>
          </el-form-item>
        </el-form>
      
        <el-button
          type="primary"
          size="mini"
          style="margin-left: 10px"
          @click="sreachRoom"
          >搜索</el-button
        >
      </el-card>
    </div>

    <el-button
      style="margin-top: 20px"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="addRoom"
      >添加房间</el-button
    >

    <el-table
      :data="roomData"
      :border="true"
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="roomId" label="编号" width="60" :align="center">
      </el-table-column>
      <el-table-column label="所属小区" width="100" :align="center">
        <template slot-scope="{ row }">
          <el-tag size="plus">{{ row.residence.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="buildingNo" label="楼栋名称" > </el-table-column>
      <el-table-column prop="unitNo" label="单元号" width="100"> </el-table-column>
      <el-table-column prop="roomNo" label="房间号" width="60"> </el-table-column>
      <el-table-column prop="roomType" label="户型" width="100"> </el-table-column>
      <el-table-column prop="roomDirection" label="房间朝向"> </el-table-column>
      <el-table-column  label="禁用"> 
        <template slot-scope="{row}">
          <el-tag type="success" v-if="row.isOnline==1">上线</el-tag>
          <el-tag type="danger" v-if="row.isOnline==0">下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rentFee" label="租金" width="80"> </el-table-column>
      <el-table-column prop="propertyFee" label="物业费" width="60"> </el-table-column>
      <el-table-column width="250" label="操作">
        <template slot-scope="{ row }">
          <HintButton type="primary" icon="el-icon-edit" size="mini" title="更新" @click="updataRommds(row)" 
            ></HintButton
          >
          <HintButton type="danger" icon="el-icon-delete"  size="mini" title="删除" @click="deleteRoom(row)"
            ></HintButton
          >
          <HintButton type="success" icon="el-icon-bottom" v-if="row.isOnline==1" size="mini" title="下线" @click="leftLine(row.roomId)"
            ></HintButton
          >
          <HintButton type="success" size="mini" icon="el-icon-top" v-if="row.isOnline==0" title="上线" @click="goToline(row.roomId)"
            ></HintButton
          >
        </template>
      </el-table-column>
    </el-table>

    <AddRoom ref="room" />
  </div>
</template>

<script>
import HintButton  from "../../components/HintButton/index.vue"
import AddRoom from "./addFrom/AddRoom.vue";
export default {
  name: "Room",
  components: { AddRoom ,HintButton},
  data() {
    return {
      roomData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      residenceName: "",
      sreach: {
        rid: "",
        roomType: "",
        minrentFee: "",
        maxrentFee:""
      },
      center: "center",
      rules: {
        minrentFee: [
          { validator: this.validateMin, trigger: "blur" },
          { validator: this.validateNumber, trigger: "blur" },
        ],
        maxrentFee: [
        { validator: this.validateNumber, trigger: "blur" },
          { validator: this.validateMax, trigger: "blur" },
          
        ],
      },
    };
  },
  methods: {
    validateMin(rule, value, callback) {
      if(value==""){
        return callback();
      }
      const one = Number(value);
      const max = Number(this.sreach.maxrentFee);
      if (!max || one < max) {
        return callback();
      }
      return callback(new Error("输入值不得大于最大阈值"));
    },
    validateMax(rule, value, callback) {
      if(value==""){
        return callback();
      }
      const one = Number(value);
      const min = Number(this.sreach.minrentFee);
      if (!min || one > min) {
        return callback();
      }
      return callback(new Error("输入值不得小于最小阈值"));
    },
    validateNumber(rule, value, callback) {
      if(value==""){
        return callback();
      }
      const one = Number(value);
      
      if( Object.is(one,NaN)  ){
        return callback(new Error(`请输入整数`));
      }
      if(one<=0){
        return callback(new Error(`请输入正整数`));
      }
      return callback();
    },
    sreachRoom() {
      this.getRoomData();
    },
    async getRoomData() {
      const { currentPage, pageSize } = this;
      const { rid, roomType, minrentFee,maxrentFee } = this.sreach;
      const res = await this.$Api.getRoomPage(
        currentPage,
        pageSize,
        rid || "",
        roomType || "",
        minrentFee || "",
        maxrentFee||""
      );
      this.roomData = res.data;
      this.total = res.total;
    },
    addRoom() {
      this.$refs.room.dialogFormVisible = true;
      this.$refs.room.clearRoom();
      this.$refs.room.seleceResidence = this.residenceName;
    },
    async getResidenceName() {
      const res = await this.$Api.getRediencePage(1, 10, "", "", "", "");
      this.residenceName = res.data.map((item) => {
        return {
          name: item.name,
          rid: item.rid,
        };
      });
    },
    updataRommds(row) {
      this.$refs.room.editRoom(row);
    },
    deleteRoom(row) {
      this.$confirm("此操作将永久删除该房间, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$Api.deleteRoom(row.roomId);
          this.getRoomData();
          this.$message.success(res.message);
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    async goToline(roomId){
      const res = await this.$Api.Online(roomId)
      if(res.status==200){
        this.$message.success("上线成功")
        this.getRoomData()
      }
    },
    async leftLine(roomId){
      const res = await this.$Api.Offline(roomId)
      if(res.status==200){
        this.$message.success("下线成功")
        this.getRoomData()
      }
    },
  },
  mounted() {
    this.getRoomData();
    this.getResidenceName();
  },
};
</script>

<style lang="less" scoped>
.box-card {
  display: flex;
  align-items: center;
  margin-top: 10px;
  
}
.el-card__body, .el-main{
 padding: 10px 10px;
}
.el-input {
  width: 200px;
}
</style>