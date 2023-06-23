<template>
  <div>
    <el-dialog :title="dataTitie" :visible.sync="dialogFormVisible">
      <el-form :model="residence" label-width="80px">
        <el-form-item label="小区名称" width="30%">
          <el-input v-model="residence.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" width="100%">
          <el-cascader
            size="large"
            :options="pcaTextArr"
            v-model="selectedOptions"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" width="30%">
          <el-input v-model="residence.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" width="30%">
          <el-input v-model="residence.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" width="50%">
          <el-input v-model="residence.linkPhone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendDate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pcaTextArr } from "element-china-area-data";
export default {
  name: "AddForm",
  data() {
    return {
      residence: {
        name: "",
        province: "",
        link: "",
        linkPhone: "",
        address: "",
      },
      dataTitie: "",
      pcaTextArr,
      selectedOptions: [],
      dialogFormVisible: false,
    };
  },
  methods: {
    // 添加小区
    async sendDate() {
      this.dialogFormVisible = !this.dialogFormVisible;
 
      this.selectedOptions = [];
      const [province, city, area] = this.selectedOptions;
      let result = { ...this.residence, province, city, area };

      if (result.rid) {
        const res = await this.$Api.putResidence(result);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
        }
      } else {
        const res = await this.$Api.addRedience(result);

        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
        }
      }
      this.$parent.getData();
    },
    clearValue() {
      let obj = this.residence
      this.selectedOptions = []
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] == "object") {
          this.clearValue(obj[key]);
        } else {
          obj[key] = "";
        }
      });
    },
    // 获取编辑小区数据
    async editResidenceData(row) {
      this.dataTitie = "编辑小区";
      this.dialogFormVisible = true;
      const res = await this.$Api.addResidenceById(row.rid);
      if (res.status == 200) {
        const d = res.data;
        this.residence = d;
        this.selectedOptions = [d.province, d.city, d.area];
      }
    },
  },
};
</script>

<style>
</style>