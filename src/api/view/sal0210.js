
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [수주진행현황] 조회
export function getSal0210(param) {
  let data = param 
  return request({
    url: `/api/getSal0210`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

