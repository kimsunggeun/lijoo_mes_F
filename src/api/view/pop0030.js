import request from '@/utils/request'


//기타/사급자재 입고 등록
export function createMat0013(param) {
  let data = param
  return request({
    url: `/api/pop/createMat0013`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

export function getReceiptInfo(param) {
  let data = param
  return request({
    url: `/api/pop/getReceiptInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

