import bas0034Data from './mock/bas0034Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 작업장 정보 조회
export function getWorkShopInfoData(param) {
  let data = param

  return request({
    url: `/api/bas0120/getWorkShopInfo/`,
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

// 작업장 정보 저장
export function saveWorkShopInfo(param) {
  let data = param
  
  return request({
    url: `/api/bas0120/saveWorkShopInfo/`,
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

// 작업장 정보 삭제
export function deleteWorkShopInfo(param) {
  let data = param
  
  return request({
    url: `/api/bas0120/deleteWorkShopInfo/`,
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