import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// [공통 코드] 조회
export function getPro0020(param) {
  let data = param
  return request({
    url: `/api/getPro0020`,
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

// [pro0010] 그리드 수정/추가
export function createPro0020(param) {
  let data = param
  return request({
    url: `/api/createPro0020`,
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


export function delPro0010(param) {
  let data = param
  return request({
    url: `/api/delPro0020`,
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

//업로드 가져오기
export function getProUpload(param) {
  let data = param
  return request({
    url: `/api/getProUpload`,
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

//업로드 저장
export function saveProUpload(param) {
  let data = param
  return request({
    url: `/api/saveProUpload`,
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