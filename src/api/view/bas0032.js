import bas0032Data from './mock/bas0032Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 창고 정보 조회
export function getWarehouseInfoData(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/bas0120/getWareHouseInfo/`,
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

// 창고 정보 저장
export function saveWareHouseInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  return request({
    url: `/api/bas0120/saveWareHouseInfo/`,
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

// 창고 정보 삭제
export function deleteWareHouseInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  return request({
    url: `/api/bas0120/deleteWareHouseInfo/`,
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