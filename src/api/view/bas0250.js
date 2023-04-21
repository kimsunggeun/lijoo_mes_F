import bas0010Data from './mock/bas0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [잡셋업유형] 공통코드에서 잡셋업 항목 가져오기
export function getInspecType(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0250/getInspecType`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }


  // [잡셋업유형] 공통코드에서 잡셋업 항목 가져오기
export function getFacItem(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0250/getFacItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }


  export function saveInspecItem(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0250/saveInspecItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }
  export function delInspecItem(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0250/delInspecItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
}
//작업반 정보 GET
export function getWorkShopInfo (param) {
  let data = param
  return request({
    url: `/api/summary=/bas0250/getWorkShopInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//설비코드 정보 GET
export function getFacilityInfo (param) {
  let data = param
  return request({
    url: `/api/summary=/bas0250/getFacilityInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}