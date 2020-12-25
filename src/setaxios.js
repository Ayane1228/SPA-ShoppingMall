import axios from 'axios'
import store from './store'
import router from './router'

// http全局拦截
// token放在我们请求的header返回到后端，如果没有token则不能访问一些网站

// 导出
export default function setAxios(){
    /* 请求拦截 interceptors：拦截器
    axios.interceptors.request.ues(config=>{...}return config;)
        拦截器作用：
        1. 修改请求头的一些配置项
        2. 给请求的过程添加一些请求的图标
        3. 给请求添加参数
        这里是 request：对请求添加拦截器
    */
    axios.interceptors.request.use(
        config=>{
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            if(store.state.token){
                config.headers.token = store.state.token
            }
            return config
        }
    )
    // 对响应添加拦截器,所有的响应都会使用拦截器
    axios.interceptors.response.use(
        response=>{
            // 判断响应的状态码:200（成功）  服务器已成功处理了请求。通常，这表示服务器提供了请求的网页。
            if(response.status ==200){
                const data = response.data
                // 模拟超时
                if(data.code == -1){
                    // 清空token并重定向到登录界面
                    store.commit('settoken',''),
                    window.localStorage.removeItem('token'),
                    router.replace('/register')
                }
                return data
            }
            return response
        }
    )
}