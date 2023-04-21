import request from '@/utils/request'

//외주업체 거래처코드 조회
export function getUserId_out0010(param) {
  let data = param
  return request({
    url: `/api/out0010/getUserId`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//외주업체 거래처코드 조회
export function getAccount(param) {
  let data = param
  return request({
    url: `/api/out0010/getAccount`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//외주업체 거래처코드 조회2
export function getAccount_out0010(param) {
  let data = param
  return request({
    url: `/api/out0010/getAccount_out0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//구매입고등록 추가 및 수정
export function createMat0012(param) {
  let data = param
  return request({
    url: `/api/out0010/createMat0012`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매입고등록 삭제
export function deleteMat0018(param) {
  let data = param
  return request({
    url: `/api/out0010/deleteMat0018`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}