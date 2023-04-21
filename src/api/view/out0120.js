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

//기간별공정외주입고현황 조회
export function getOut0120(param) {
  let data = param
  return request({
    url: `/api/getOut0120`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//기간별공정외주입고현황 - 일자별조회 조회
export function getOut0120byDate(param) {
  let data = param
  return request({
    url: `/api/getOut0120byDate`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}