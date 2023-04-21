import bas0031Data from './mock/bas0031Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 공정 정보 조회
export function getProcInfo(param) {
  let data = param
  
  return request({
    url: `/api/bas0120/getProcInfo`,
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

// 공정 정보 저장
export function saveProcInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/saveProcInfo`,
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

// 공정 정보 삭제
export function deleteProcInfo(param) {
  let data = param

  return request({
    url: `/api/bas0120/deleteProcInfo`,
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

// 공정명 정보
export function getProcessName(param) {
  let data = param
  
    return request({
    url: `/api/bas0120/getProcessName/`,
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