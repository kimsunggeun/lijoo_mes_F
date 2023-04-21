import request from '@/utils/request'

// 수주번호 획득
export function getPop0410OrderNo(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/getPop0410OrderNo`,
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
export function getPop0410PlannedShipmentInfo(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/getPop0410PlannedShipmentInfo`,
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