
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 메뉴 접속 통계 조회
export function getMenuStatistics(param) {
  let data = param 
  return request({
    url: `/com/getMenuStatistics`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴 접속 통계 수집
export function saveMenuStatistics(param) {
  let data = param 
  return request({
    url: `/com/saveMenuStatistics`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

