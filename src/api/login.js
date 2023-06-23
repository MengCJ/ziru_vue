import req from "@/api/request"


export const doLogin = (data)=> req({url:'/doLogin',method:"post",data, headers:{"Content-Type":"application/x-www-form-urlencoded"},})

export const logout = ()=> req({url:'/logout',method:"get"})

