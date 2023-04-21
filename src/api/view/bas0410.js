import bas0010Data from './mock/bas0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [검사유형] 공통코드에서 검사 항목 가져오기
export function getInspecType(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0410/getInspecType`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }


  // [검사유형] 공통코드에서 검사 항목 가져오기
export function getInspecItem(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0410/getInspecItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }


  export function saveInspecItem(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0410/saveInspecItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }
  export function delInspecItem(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0410/delInspecItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }