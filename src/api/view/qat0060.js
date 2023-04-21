import request from '@/utils/request'

// 납품정보 조회
export function getQat0060(param) {
  let data = param
  return request({
    url: `/api/qat0060/getQat0060`,
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

// 검사내역 조회
export function getInspection(param) {
  let data = param
  return request({
    url: `/api/qat0060/getInspection`,
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

// 검사내역 저장
export function createQat0060(param) {
  let data = param
  return request({
    url: `/api/qat0060/createQat0060`,
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

// 검사내역 취소
export function deleteQat0060(param) {
  let data = param
  return request({
    url: `/api/qat0060/deleteQat0060`,
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