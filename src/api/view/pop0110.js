import request from '@/utils/request'

//외주출고 상세내역
export function getPop0110(param) {
  let data = param

  return request({
    url: `/api/pop/getPop0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//외주출고 저장
export function setPop0110(param) {
  let data = param
  return request({
    url: `/api/pop/setPop0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}