import request from '@/utils/request'

// 불량현황 조회
export function getdefStatus(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/qat0120/getdefStatus`,
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

// 불량수량 상세정보 조회
export function getDefQtyDetail(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/qat0120/getDefQtyDetail`,
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

// 불량현황상세정보 조회
export function getDefDetail(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/qat0120/getDefDetail`,
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