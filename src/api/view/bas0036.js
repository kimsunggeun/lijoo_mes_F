import bas0036Data from './mock/bas0036Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 설비 정보 조회
export function getFacilityInfoData(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/bas0120/getFacilityInfo`,
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

// 설비 정보 저장
export function saveFacilityInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/saveFacilityInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 설비 정보 삭제
export function deleteFacilityInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/deleteFacilityInfo`,
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