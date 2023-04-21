import request from '@/utils/request'

//거래처코드 조회
export function getCustCode(param) {
  let data = param
  return request({
    url: `/api/pop/getCustCode`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//입고처에 의한 발주번호 조회
export function getOrdNo(param) {
  let data = param
  return request({
    url: `/api/pop/getOrdNo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//발주번호에 의한 발주정보 상세 조회
export function getMat0011(param) {
  let data = param
  return request({
    url: `/api/pop/getMat0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//
export function createMat0012(param) {

  let data = param
  return request({
    url: `/api/pop/createMat0012`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//발주번호에 의한 입고현황 상세 조회
export function getMat0012(param) {
  let data = param
  return request({
    url: `/api/pop/getMat0012`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
