import request from '@/utils/request'

// 검사내역 조회
export function getQat0010(param) {
  let data = param
  return request({
    url: `/api/qat0110/getQat0010`,
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