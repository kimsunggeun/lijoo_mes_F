import request from '@/utils/request'

// 수주번호 획득
export function getPop0420OrderNo(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/getPop0420OrderNo`,
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

// 출하일별 조회
export function getPop0420UnPlannedShipmentInfo(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/getPop0420UnPlannedShipmentInfo`,
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