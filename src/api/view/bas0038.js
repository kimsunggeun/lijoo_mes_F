import bas0038Data from './mock/bas0038Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 경로 정보 상세 조회
export function getRouteDetailInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/bas0120/getRouteInfo`,
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

// 경로 정보 상세 저장
export function saveRouteDetailInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/bas0120/saveRouteInfo`,
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

// 경로 정보 상세 삭제
export function deleteRouteDetailInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/bas0120/deleteRouteInfo`,
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

//  자동투입창고 데이터
export function getAutoStorage(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/bas0120/getAutoStorage`,
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