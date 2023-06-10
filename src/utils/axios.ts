import axios from 'axios';

const service = axios.create({
  baseURL: 'http://127.0.0.1:5173',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // do something 
    return config
  }
)

// 响应拦截器
service.interceptors.response.use(
  async(response) => {
    // do something 
    return response.data
  },
  (error) => {
    // do something
    return Promise.reject(error)
  }
)

export default service