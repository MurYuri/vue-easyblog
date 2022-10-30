import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8'
const contentTypeJson = 'application/json'
const contentTypeFile = 'multipart/form-data'

const request = (config) => {
    const {url, params, dataType = 'form', showLoading = 'true'} = config
    // dataType = dataType ? dataType : 'form'
    // showLoading = showLoading ? true : showLoading
    
    let contentType = contentTypeForm
    if (dataType === 'json') {
        contentType = contentTypeJson
    } else if (dataType === 'file') {
        contentType = contentTypeFile
        let param = new FormData();
        for (let key in params) {
            param.append(key, params[key]);
        }
        params = param
    }

    const instance = axios.create({
        baseURL: '/api',
        timeout: 1000 * 10,
        headers: {
            'Content-Type': contentType,
            'X-Requested-With': 'XMLHttpRequest',
        }
    })

    // 请求拦截器
    let loading = null;
    instance.interceptors.request.use(
        (config) => {
            if (showLoading) {
                loading = ElLoading.service({
                    lock: true,
                    text: '加载中......',
                    background: 'rgba(255, 255, 255, 0.8)',
                  })
            }
            return config
        },
        (error) => {
            if (showLoading && loading) {
                loading.close()
            }
            ElMessage({
                message: '发送请求失败',
                type: 'error',
            })
            return Promise.reject('发送请求失败')
        }
    )
    // 响应拦截器
    instance.interceptors.response.use(
        (response) => {
            if (showLoading && loading) {
                loading.close()
            }
            const responseData = response.data
            return response
        },
        (error) => {
            console.log(error)
            if (showLoading && loading) {
                loading.close()
            }
            return Promise.reject('网络异常')
        }
    )
    
    // return instance.post(url, params).catch(error => {
    //     ElMessage({
    //         message: error,
    //         type: 'error',
    //     })
    //     return null
    // })

    let result = new Promise((resolve, reject) => {
        instance.post(url, params).then(res => {
            resolve(res)
        }).catch(error => {
            ElMessage({
                message: error,
                type: 'error',
            })
        })
    })

    return result
}

export default request