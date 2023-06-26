import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
return originalReplace.call(this , location).catch(err=>err)
}


const routes = [
  {
    path: '/',
    name: 'login',
    component: ()=>import("@/views/Login.vue"),
    hidden:true
  },

  {
    path: '/home',
    name: 'home',
    component: ()=>import("@/views/Home"),
    hidden:true,
    meta:{
      icon:"el-icon-film"
    }
  },
  {
    path: '/home',
    name: '用户管理',
    component: ()=>import("@/views/Home"),
    meta:{
      icon:"el-icon-user"
    },
    children:[
      {
        path:'/adduser',
        name:"添加用户",
        component:()=>import("@/views/user/Adduser"),
        meta:{
          name:"添加用户",icon:"el-icon-plus"
        }
      },
     {
      path:"/searchuser",
      name:'查看用户',
      component:()=>import("@/views/user/Searchuser"),
      meta:{
        name:"查看用户",icon:"el-icon-tickets"
      }
     }
    
    ]
  },
  {
    path: '/home',
    name: '岗位管理',
    component: ()=>import("@/views/Home"),
    meta:{
      icon:"el-icon-menu",
    },
    children:[
      {
        path:'/role',
        name:"管理岗位",
        component:()=>import("@/views/role/Role"),
        meta:{
          name:"岗位管理",icon:"el-icon-document-remove"
        }
      }
    ]
  },
  {
    path: '/home',
    name: '房源管理',
    component: ()=>import("@/views/Home"),
    meta:{
      icon:"el-icon-s-home",
    },
    children:[
      {
        path:'/residence',
        name:"小区管理",
        component:()=>import("@/views/room/Residence.vue"),
        meta:{
          name:"小区管理",icon:"el-icon-office-building"
        }
      },
     {
      path:"/room",
      name:'房间管理',
      component:()=>import("@/views/room/Room.vue"),
      meta:{
        name:"房间管理",icon:"el-icon-film"
      }
     }
    
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
