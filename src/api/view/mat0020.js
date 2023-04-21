import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

//창고별 재고현황 조회
export function getMat0210(param) {
  let data = param

  return request({
    url: `/api/getMat0210`,
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