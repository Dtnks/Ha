import axios from "axios";
import serverConfig from "./config";
import qs from "qs";

const serviceAxios = axios.create({
    baseURL: "http://117.72.15.181:8884", // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
  });

serviceAxios.interceptors.request.use(
(config) => {
    // 如果开启 token 认证
    if (serverConfig.useTokenAuthorization) {
    config.headers["Authorization"] = localStorage.getItem("token"); // 请求头携带 token
    }
    // 设置请求头
    if(!config.headers["content-type"]) { // 如果没有设置请求头
    if(config.method === 'post') {
        config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
        config.data = qs.stringify(config.data); // 序列化,比如表单数据
    } else {
        config.headers["content-type"] = "application/json"; // 默认类型
    }
    }
    console.log("请求配置", config);
    return config;
},
(error) => {
    Promise.reject(error);
}
);