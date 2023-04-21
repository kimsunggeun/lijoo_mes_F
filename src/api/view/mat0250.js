
import request from '@/utils/request'

// [기타/사급자재 현황] 조회
export function getMat0250(param) {
  let data = param 
  return request({
    url: `/api/getMat0250`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [기타/사급자재 상세현황] 조회
export function getMat0250Detail(param) {
  let data = param 
  return request({
    url: `/api/getMat0250Detail`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}