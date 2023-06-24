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