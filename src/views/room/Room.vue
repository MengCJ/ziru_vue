<template>
  <div class="room">
    <el-button
      style="margin-top: 20px"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="addRoom"
      >添加房间</el-button
    >


    <el-table :data="roomData" border style="width: 100%;margin-top: 10px;">
      <el-table-column prop="roomId" label="编号" width="90"> </el-table-column>
      <el-table-column prop="rid" label="所属小区" width="180"> </el-table-column>
      <el-table-column prop="buildingNo" label="楼栋名称"> </el-table-column>
      <el-table-column prop="unitNo" label="单元号"> </el-table-column>
      <el-table-column prop="roomNo" label="房间号"> </el-table-column>
      <el-table-column prop="roomType" label="户型"> </el-table-column>
      <el-table-column prop="roomDirection" label="房间朝向"> </el-table-column>
      <el-table-column prop="rentFee" label="租金"> </el-table-column>
      <el-table-column prop="propertyFee" label="物业费"> </el-table-column>
      <el-table-column width="200"> 
        <template slot-scope="{row}">
            <el-button type="success" size="mini">更新</el-button>
            <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AddRoom ref="room"/>

  </div>
</template>

<script>
import AddRoom from "./addFrom/AddRoom.vue"
export default {
  name: "Room",
  components:{AddRoom},
  data(){
    return{
        roomData:[],
        currentPage:1,
        pageSize:10,
        total:0
    }
  },
  methods:{
    async getRoomData(){
        const{currentPage,pageSize} = this
        const res = await this.$Api.getRoomPage(currentPage,pageSize);
            this.roomData = res.data
            this.total = res.total
    },
    addRoom(){
        this.$refs.room.dialogFormVisible = true
    }
  },
  mounted(){
    this.getRoomData()
  }
  
};
</script>

<style lang="less" scoped>
.room {
}
</style>