
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [pro0140] 조회
export function getPro0140(param) {
  let data = param
  if (!isUseAPI()) {
    console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      resolve(dataList)
    })
  }
  if (param.workDecode == null){ param.workDecode = '' }
  if (param.workCode == null){ param.workCode = '' }
  if (param.workCode.substring(0,1) != param.workDecode.substring(0,1) && param.workCode != null && param.workCode != ''){
    param.workDecode = ''
  }
  return request({
    url: `/api/getPro0140`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data  
  })
}

// [pro0140] 작업반 코드
export function getBas0035(param) {
  let data = param
  return request({
    url: `/api/getBas0035`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}