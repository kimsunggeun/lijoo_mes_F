
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [구매 발주 현황상세] 조회
export function getMat0220(param) {
  let data = param 
  return request({
    url: `/api/getMat0220`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}


