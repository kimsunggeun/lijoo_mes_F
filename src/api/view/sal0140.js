
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [출하정보상세] 조회
export function getSal0120(param) {
  let data = param 
  return request({
    url: `/api/sal0140/getSal0120`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [반품내역] 조회
export function getSal0140(param) {
  let data = param 
  return request({
    url: `/api/sal0140/getSal0140`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [반품내역] 등록
export function insertSal0140(param) {
  let data = param
  return request({
    url: `/api/sal0140/insertSal0140`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}


// [반품내역] 삭제
export function deleteSal0140(param) {
  let data = param
  return request({
    url: `/api/sal0140/deleteSal0140`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
