import req from "@/api/request"

//小区接口
export const addRedience = (data) => req({url:"/residence",method:'post',data})

export const getRediencePage = (page,size,name,province,city,area) =>req({url:`/residence?page=${page}&size=${size}&name=${name}&province=${province}&city=${city}&area=${area}`,method:'get'})

export const deleteResidence = (rid) =>req({url:`/residence/${rid}`,method:"delete"})

export const addResidenceById = (rid) =>req({url:`/residence/${rid}`,method:"get"})

export const putResidence = (data) => req({url:"/residence",method:'put',data}) 

//房源接口
export const addRoom = (data)=>req({url:'/room',method:"post",data})

export const getRoomPage = (page,size)=>req({url:`/room?page=${page}&size=${size}`,method:"get"})

export const deleteRoom = (roomId)=>req({url:`/room/${roomId}`,method:"delete"})

export const getRoomById = (roomId)=>req({url:`/room/${roomId}`,method:"get"})

export const updataRoom = (data)=>req({url:"/room",method:"put",data})