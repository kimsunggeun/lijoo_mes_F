import bas0030Data from './mock/bas0030Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 공장 정보 조회
export function getFactoryInfoData(param) {
  let data = param

  return request({
    url: `/api/bas0120/getFacInfo/`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type': 'application/json;charset=utf8'
    },
    data
  })
}

// 공장 정보 저장
export function saveFacInfo(param) {
  let data = param
  
    return request({
    url: `/api/bas0120/saveFacInfo/`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type': 'application/json;charset=utf8'
    },
    data
  })
}

// 공장 정보 삭제
export function deleteFacInfo(param) {
  let data = param
  
    return request({
    url: `/api/bas0120/deleteFacInfo/`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type': 'application/json;charset=utf8'
    },
    data
  })
}