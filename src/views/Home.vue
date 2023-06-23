<template>
  <div>
    <div class="header">
      <div>
        <span class="fonts">自如租房管理系统</span>
      </div>
      <div class="dropdown">
        <el-dropdown @command="handleCommand">
          <span
            class="el-dropdown-link"
            style="
              display: flex;
              width: 130px;
              align-items: center;
              cursor: pointer;
              justify-content: space-around;
              font-size: 14px;
            "
          >
            {{ user.name }}<i><img id="img" :src="user.userface" alt="" /></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="system">系统中心</el-dropdown-item>
            <el-dropdown-item command="person">个人中心</el-dropdown-item>
            <el-dropdown-item command="delete">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="middle">
      <div class="left">
        <el-menu
          class="el-menu-vertical-demo"
          router
          
        >
          <template v-for="(menu, index1) in this.$router.options.routes">
            <el-submenu :index="index1 + ''" :key="index1" v-if="!menu.hidden">
              <template slot="title">
                <i :class="menu.meta.icon"></i>
                <span>{{ menu.name }}</span>
              </template>
              <el-menu-item
                :index="menuc.path"
                v-for="(menuc, indexj) in menu.children"
                :key="indexj"
                ><i :class="menuc.meta.icon"></i>{{ menuc.meta.name }}</el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="right">
        <el-breadcrumb separator-class="el-icon-arrow-right"  v-show="this.$router.currentRoute.path != '/home'">
        <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item >{{$router.currentRoute.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="context" v-show="$router.currentRoute.path=='/home'">
          欢迎访问自如租房管理系统！
      </div>
        <router-view></router-view>
      </div>
    </div>

  </div>


</template>

<script>
import { logout } from "@/api/login";
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem("userInfo")),
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "delete") {
        this.$confirm("你确定要退出吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const res = await logout();
            this.$message({
              type: "success",
              message: "退出成功!",
            });
            window.localStorage.removeItem("userInfo");
            this.$router.push("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消退出",
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.context{
  font-family: "华文行楷";
  font-size: 30px;
  display: flex;
  // align-items: center;
  justify-content: center;
  margin-top: 100px;
}
#img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.dropdown {
  display: flex;
  align-items: center;
  padding: 10px;
}
.header {
  width: 100%;
  height: 50px;
  min-width: 500px;
  background: #b3c0d1;
  display: flex;
  justify-content: space-between;
  .fonts {
    font-family: "华文行楷";
    font-size: 25px;
    line-height: 50px;
    padding: 100px;
  }
}
.middle {
  display: flex;
  .left {
    width: 250px;
    height: 90%;
    background: #d3dce6;
  }
  .right {
    flex-grow: 1;
    height: 90%;
    // background: #e9eef3;
    padding: 10px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>