import req from "@/api/request"

/** 
 * 用户接口
*/

// 添加用户
export const addUser = (user) => req({url:'/user',method:'post',data:user})

// 查看用户
export const searchUser = (params) => req({url:'/user',method:'get',params})

// 删除用户
export const deleteUser = (id) => req({url:`/user/${id}`,method:'delete'})

// 修改用户
export const editUser = (user) => req({url:'/user',method:'put',data:user})

// 根据id查询用户信息
export const getUserById = (id) => req({url:`/user/${id}`,method:'get'})

// 解封用户
export const deBlockedUser = (id) => req({url:`/user/${id}`,method:'put'})

// 查看可用岗位
export const getRoleList = () => req({url:'/role',method:'get'})

// 查看所有岗位
export const getAllRoleList = () => req({url:'/role/all',method:'get'})

// 分页查询所有岗位
export const getRoleListByPage = (params) => req({url:'/role/page',method:'get',params})

// 更新岗位状态
export const updateRole = (role) => req({url:'/role',method:'put',data:role})
// 添加岗位
export const addRole = (role) => req({url:'/role',method:'post',data:role})