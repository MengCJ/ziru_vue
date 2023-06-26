// 对于axios进行二次封装
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router';
import {Message} from 'element-ui';
// start:进度条开始  done：进度条结束
// 利用axios对象的方法create去创建一个axios实例
// request就是axios，只不过稍稍配置一下
let requests =  axios.create({
    baseURL:'/',
    // 代表请求超时时间5s
    timeout:5000,

});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以做一些事情
requests.interceptors.request.use((config)=>{
    
        // 进度条开始
        nprogress.start();
    // 配置对象，对象里面有一个很重要的对象，headers请求头
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // console.log('响应拦截器',res)
    if (res && res.status == 200 && res.data.status == 500) {
        // success.status 表示 HTTP 的响应状态码
        // success.data.status 表示服务端返回的 JSON 中的 status 的值
        //此时，说明业务是失败的
        //在这里直接返回
        router.replace("/")
        nprogress.done();
        return  ;
    }
    // if (res.data.message) {
    //     //如果服务端返回的 JSON 中包含 message 字段，则将之弹框显示出来
    //     Message.res(res.data.message);
    // }
    nprogress.done();
    return res.data
},(error)=>{
    nprogress.done();
    if(error.response.status&&error.response.status==401){
        router.replace("/")
    }
    // return Promise.reject(new Error("faile"))
});

export default requests;