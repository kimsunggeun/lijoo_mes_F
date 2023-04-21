import request from '@/utils/request'

// 품목 정보 조회
export function getItemInfo(param) {
  let data = param

  return request({
    url: `/api/bas0230/getItemSelect`,
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

//BOM 역전개 조회
export function getBomImplosion(param) {
  let data = param
  return request({
    url: `/api/bas0230/getBomImplosion`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}