import bas0033Data from './mock/bas0033Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 창고 위치 정보 조회
export function getWarehouseLocInfoData(param) {
  let data = param

  return request({
    url: `/api/bas0120/getWareHouseLocInfo/`,
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

// 창고 위치 정보 저장
export function saveWareHouseLocInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/saveWareHouseLocInfo/`,
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

// 창고 위치 정보 삭제
export function deleteWareHouseLocInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/deleteWareHouseLocInfo/`,
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