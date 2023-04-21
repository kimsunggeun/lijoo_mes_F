import request from '@/utils/request'

//공정외주 정보상세 조회
export function getPro0026(param) {
  let data = param
  return request({
    url: `/api/out0030/getPro0026`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//공정외주 납품등록 조회
export function getOut0011(param) {
  let data = param
  return request({
    url: `/api/out0030/getOut0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//공정외주 납품등록
export function createOut0011(param) {
  let data = param
  return request({
    url: `/api/out0030/createOut0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//공정외주 납품삭제
export function deleteOut0011(param) {
  let data = param
  return request({
    url: `/api/out0030/deleteOut0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
