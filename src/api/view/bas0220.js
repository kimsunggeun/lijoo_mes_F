import request from '@/utils/request'

// 품목 정보 조회
export function getItemInfo(param) {
  let data = param

  return request({
    url: `/api/bas0220/getItemSelect`,
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

//BOM 정전개 조회
export function getBomExplosion(param) {
  let data = param
  return request({
    url: `/api/bas0220/getBomExplosion`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}