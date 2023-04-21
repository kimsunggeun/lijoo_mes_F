import request from '@/utils/request'

// 수주 정보 조회
export function getCustOrder(param) {
  let data = param

  return request({
    url: `/api/sal0020/getCustOrder`,
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

// 수주 정보 저장
export function saveCustOrder(param) {
  let data = param

  return request({
    url: `/api/sal0020/saveCustOrder`,
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