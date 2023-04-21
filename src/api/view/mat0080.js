import request from '@/utils/request'

//구매발주업로드 정보조회
export function getPurchaseOrder(param) {
  let data = param
  return request({
    url: `/api/Mat0080/getPurchaseOrder`,
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
// 구매발주업로드 정보 저장
export function savePurchaseOrder(param) {
  let data = param

  return request({
    url: `/api/Mat0080/savePurchaseOrder`,
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