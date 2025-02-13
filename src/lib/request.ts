import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { showFailToast } from 'vant'

export interface IData {
  code: number
  data: any
  msg: string
  success: boolean
}

const ajax: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 20000,
  withCredentials: true,
})

ajax.interceptors.request.use((config) => {
  // config.headers!.Authorization = `Basic ${Base64.encode(
  //   `${website.clientId}:${website.clientSecret}`,
  // )}`;
  // const apiToken = getStore({ name: website.tokenKey })
  // apiToken && (config.headers![website.tokenHeader] = apiToken)
  return config
})

ajax.interceptors.response.use((response: AxiosResponse) => {
  const { data, status } = response
  if (data.code === 200 || status === 200) {
    return data
  }
  else {
    showFailToast(data.msg)
    return Promise.reject(new Error(data.msg || '请求失败'))
  }
}, ({ response }) => {
  const { data } = response
  showFailToast(data.msg)
  return Promise.reject(data)
})

const request = ({ ...data }) => ajax(data).then(res => res)

export { request }
export default ajax
