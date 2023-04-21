
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [출하반품현황] 조회
export function getSal0230(param) {
  let data = param 
  return request({
    url: `/api/getSal0230`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

