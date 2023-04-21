import request from '@/utils/request'

// 수주현황 조회 - 수주일 기준
export function getOrdStatusOnOrderDate(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/sal0120/getOrdStatusOnOrderDate`,
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

// 수주현황 조회 - 납기일 기준
export function getOrdStatusOnDeliveryDate(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/sal0120/getOrdStatusOnDeliveryDate`,
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

// 출하등록 조회
export function getSal0120(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/sal0120/getSal0120`,
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

// 출하등록 조회
export function getSal0120Status(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/sal0120/getSal0120Status`,
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

// 출하등록 입력
export function createSal0120(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/sal0120/createSal0120`,
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

// 출하등록 삭제
export function deleteSal0120(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/sal0120/deleteSal0120`,
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

// 공장명 가져오기
export function getFacName(param) {
  let data = param
  return request({
    url: `/api/bas0120/getFacName`,
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