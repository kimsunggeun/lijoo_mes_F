
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [출하게획등록] 조회
export function getSal0110(param) {
  let data = param 
  return request({
    url: `/api/getSal0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [출하게획등록] 입력/수정
export function createSal0110(param) {
  let data = param 
  return request({
    url: `/api/createSal0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

