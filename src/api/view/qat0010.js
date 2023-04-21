import request from '@/utils/request'

// 납품정보 조회
export function getDelInfo(param) {
  let data = param
  return request({
    url: `/api/qat0010/getDelInfo`,
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
export function getInsDetails(param) {
  let data = param
  return request({
    url: `/api/qat0010/getInsDetails`,
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
export function saveInsDetails(param) {
  let data = param
  return request({
    url: `/api/qat0010/saveInsDetails`,
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

//구매입고등록 상세 정보
export function getMat0018Info(param) {
  let data = param

  return request({
    url: `/api/qat0010/getMat0018_Qat0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
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

// 검사내역 조회
export function getInsDetails2(param) {
  let data = param
  return request({
    url: `/api/qat0010/getInsDetails2`,
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

// 입고취소
export function deleteQat0010(param) {
  let data = param
  return request({
    url: `/api/qat0010/deleteQat0010`,
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
