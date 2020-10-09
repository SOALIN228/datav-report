/**
 * User: soalin
 * Date: 2020/10/9
 * Time: 07:05
 * Desc:
 */
import axios from 'axios'

const service = axios.create({
  baseURL: 'https://book.youbaobao.xyz:18082',
  timeout: 500
})

service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      return response.data
    } else {
      return Promise.reject(new Error('请求错误'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
