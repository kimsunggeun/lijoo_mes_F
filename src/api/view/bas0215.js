import request from '@/utils/request'

// 공장명 조회
export function getFacCode (param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/bas0215/getFacCode`,
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

export function getProCodeNameWithPathCode (param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/bas0215/getProCodeNameWithPathCode`,
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

