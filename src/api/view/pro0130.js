
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [공통 코드] 조회
export function getPro0130(param) {
  let data = param
  if (!isUseAPI()) {
    console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }

      resolve(dataList)
    })
  }
  return request({
    url: `/api/getPro0130`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data  
  })
}

