import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//구매입고등록 상세 정보
export function getMat0014Info(param) {
  let data = param

  return request({
    url: `/api/getMat0014`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
