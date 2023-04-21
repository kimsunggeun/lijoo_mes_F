import request from '@/utils/request'

//거래처별 전표번호
export function getinIlno(param) {
  let data = param
  return request({
    url: `/api/pop/getinIlno`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//외주공정 입고
export function getPop0120(param) {
  let data = param
  return request({
    url: `/api/pop/getPop0120`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

export function setPop0120(param) {
  let data = param
  return request({
    url: `api/pop/setPop0120`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type' : 'application/json;charset=utf8'
    },
    data
  })
}