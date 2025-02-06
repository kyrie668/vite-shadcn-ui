import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * @description 请求基础配置
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api', // API 基础 URL
  timeout: 5000, // 超时时间 5s
  withCredentials: true, // 允许跨域携带凭证
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

/**
 * @description 请求拦截器
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在此处添加 token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @description 响应拦截器
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    console.error('请求出错：', error);
    return Promise.reject(error);
  }
);

/**
 * @description 封装 GET 请求
 */
export function get<T>(url: string, params?: object): Promise<T> {
  return axiosInstance.get<T>(url, { params }).then((response) => response.data); // ✅ 提取出 AxiosResponse 中的数据部分
}

/**
 * @description 封装 POST 请求
 */
export function post<T>(url: string, data?: object): Promise<T> {
  return axiosInstance.post<T>(url, data).then((response) => response.data); // ✅ 提取出 AxiosResponse 中的数据部分
}

export default axiosInstance;
