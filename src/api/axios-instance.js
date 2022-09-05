import router from "@/router";
import axios from "axios";

// 创建axios实例
const axiosInstance = axios.create({
    baseURL,
    timeout: 30000,
});

// 拦截请求、处理后发送请求
axiosInstance.interceptors.request.use(config => {
    const authorization = localStorage.getItem('token')
    config.headers['Authorization'] = authorization
    return config;
}, error => {
    console.log(error);
});

// 拦截响应，处理后返回结果
axiosInstance.interceptors.response.use(res => {
    if (res.data.code === 500) {
        localStorage.removeItem('token')
        if (window.location.href.indexOf('/common/login') === -1) {
            setTimeout(() => {
                router.replace({
                    name: 'CommonLogin',
                    label: '登陆',
                })
            }, 1500);
        }
    }
    return res.data;
}, error => {
    console.log(error);
});

// 导出axios实例
export default axiosInstance;
