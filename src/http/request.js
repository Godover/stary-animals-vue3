import axios from 'axios';
import {uuid} from "vue-uuid";

import {ElMessage} from 'element-plus';

// 获取 UID
function getUid() {
    let uid = localStorage.getItem("uid");
    if (uid === undefined || uid === null) {
        uid = uuid.v4()
        localStorage.setItem("uid", uid)
    }
    return uid;
}

// 记录和显示错误
function errorLog(msg) {
    ElMessage.error({
        message: msg,
        duration: 3500
    })
}

const service = axios.create({
    timeout: 15000 // 请求超时时间
});
// 跨域
service.defaults.withCredentials = true
// 请求拦截器
service.interceptors.request.use(
    config => {
        config.headers['Source'] = 'web';
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Content-type'] = "application/json; charset=utf-8";
        config.headers['guid'] = uuid.v4();
        config.headers['uid'] = getUid();
        config.data = {
            model: config.data === undefined ? null : config.data,
            header: {
                userId: JSON.parse(localStorage.getItem("userInfo")) === null ? null : JSON.parse(localStorage.getItem("userInfo")).id
            }
        }
        config.data = JSON.stringify(config.data)
        return config;
    });

// 响应拦截器
service.interceptors.response.use(
    response => {
        console.log("response=>", response)
        if (response.data.success === true) {
            return response.data.data;
        }
        errorLog(response.data.msg);
        return Promise.reject(response.data.msg);
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break;
                case 401:
                    error.message = '未授权，请登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器内部错误';
                    break;
                case 501:
                    error.message = '服务未实现';
                    break;
                case 502:
                    error.message = '网关错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网关超时';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break;
                default:
                    break;
            }
        }
        errorLog(error.message);
        return Promise.reject(error.message);
    }
);

export default service;
