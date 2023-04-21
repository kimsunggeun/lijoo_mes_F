import bas0035Data from './mock/bas0035Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 작업반 정보 조회
export function getWorkPartyInfoData(param) {
  let data = param

  return request({
    url: `/api/bas0120/getWorkPartyInfo/`,
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

// 작업반 정보 저장
export function saveWorkPartyInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/saveWorkPartyInfo/`,
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

// 작업반 정보 삭제
export function deleteWorkPartyInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/deleteWorkPartyInfo/`,
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