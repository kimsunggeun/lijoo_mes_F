import request from '@/utils/request'

// 기타출고등록 조회
export function getPop0430(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/getPop0430`,
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

// 기타출고등록 입력
export function createPop0430(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/createPop0430`,
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

// 거래처별 품목 정보 조회
export function getItemListWithCustCode(param) {
  console.log('param', param)
  let data = param
  return request({
    url: `/api/pop/getItemListWithCustCode`,
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