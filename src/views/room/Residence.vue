<template>
  <div class="wapper">
    <el-card class="box-card">
      <span>
        小区名称：
        <el-input
          style="width: 200px"
          v-model.trim="search.name"
          size="mini"
        ></el-input>
      </span>
      <span style="margin: 0 20px">
        所在地区：
        <el-cascader
          size="mini"
          :options="pcaTextArr"
          v-model="search.pro"
          style="width: 200px"
          clearable
        >
        </el-cascader>
      </span>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="getData"
        >搜索</el-button
      >
    </el-card>

    <div style="display: flex; justify-content: space-between">
      <el-button
        type="primary"
        @click="showDataTable"
        icon="el-icon-plus"
        size="mini "
        style="margin-top: 10px"
        >添加</el-button
      >
      <div style="margin-top: 10px; display: flex">
        <el-upload
          action="residence/import"
          multiple
          :show-file-list="false"
          :on-success="onOnSuccess"
          :limit="3"
        >
          <el-button type="success" style="margin: 0 10px" size="mini"
            >上传数据</el-button
          >
        </el-upload>
        <el-button type="success" size="mini" @click="exportData"
          >下载数据</el-button
        >
      </div>
    </div>

    <el-table
      :data="residences"
      stripe
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="rid" label="小区编号" width="60" >
      </el-table-column>
      <el-table-column prop="name" label="小区名称" width="180">
      </el-table-column>
      <el-table-column label="所在地区" width="300">
        <template slot-scope="{ row }">
          <el-tooltip effect="dark" :content="row.address" placement="top-end">
            <div>{{ row.province }}/{{ row.city }}/{{ row.area }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="联系人" width="150"> </el-table-column>
      <el-table-column prop="linkPhone" label="联系电话"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-tag
            type="success"
            style="margin-right: 10px; cursor: pointer"
            size="mini"
            @click="editResidence(row)"
            >编辑</el-tag
          >

          <el-tag
            type="danger"
            style="cursor: pointer"
            @click="deleteResidence(row)"
            >删除</el-tag
          >
        </template>
      </el-table-column>
    </el-table>

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

    <AddForm ref="child"></AddForm>
  </div>
</template>
  
  <script>
import { pcaTextArr } from "element-china-area-data";
import AddForm from "@/views/room/addFrom/AddForm.vue";
export default {
  name: "Adduser",
  components: { AddForm },
  data() {
    return {
      residences: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      pcaTextArr,
      search: {
        name: "",
        pro: [],
      },
    };
  },
  methods: {
    // 上传文件
    onOnSuccess() {
      this.$message.success("上传成功");
      this.getData();
    },
    //导出文件
    exportData() {
      window.open("/residence/export", "_blank");
    },
    // 编辑小区
    editResidence(row) {
      this.$refs.child.editResidenceData(row);
    },
    showDataTable() {
      this.$refs.child.dialogFormVisible = true;
      this.$refs.child.dataTitie = "添加小区";
      this.$refs.child.clearRedience()
    },
    // 删除小区
    deleteResidence(row) {
      this.$confirm(`此操作将删除该${row.name}小区, 是否继续?`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$Api.deleteResidence(row.rid);
          if (res.status == 200) {
            this.$message.success(res.message);
            this.getData();
          }
        })
        .catch(() => {
          this.$message.error("取消删除");
        });
    },
    // 添加小区
    async sendDate() {
      this.dialogFormVisible = !this.dialogFormVisible;
      const [province, city, area] = this.selectedOptions;
      let result = { ...this.residence, province, city, area };
      const res = await this.$Api.addRedience(result);
      if (res.status == 200) {
        this.$message({
          type: "success",
          message: "添加成功",
        });
      }
    },
    // 获取小区的数据
    async getData() {
      const { currentPage, pageSize } = this;
      const { name, pro } = this.search;
      const [province, city, area] = pro;
      const res = await this.$Api.getRediencePage(
        currentPage,
        pageSize,
        name,
        province || "",
        city || "",
        area || ""
      );
      this.residences = res.data;
      this.total = res.total;
    },
    // 修改当前的页数
    handleSizeChange(e) {
      this.pageSize = e;
      this.getData();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
  
  <style scoped>
.wapper {
  margin-top: 20px;
}
.box-card {
  display: flex;
  justify-content: center;
}
</style >
  
  