
import request from '@/utils/request'

// [입고정보] 조회
export function getMat0012(param) {
  let data = param 
  return request({
    url: `/api/getMat0050`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [재고현황] 조회
export function getMat0018(param) {
  let data = param 
  return request({
    url: `/api/getMat0051`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [반품내역] 조회
export function getMat0030(param) {
  let data = param 
  return request({
    url: `/api/getMat0052`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [반품내역] 등록
export function insertMat0030(param) {
  let data = param
  return request({
    url: `/api/insertMat0050`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [반품내역] 삭제
export function deleteMat0030(param) {
  let data = param

  return request({
    url: `/api/deleteMat0050`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [반품등록을 위한 재고 수량 비교] 조회
export function getMat0020(param) {
  let data = param 
  return request({
    url: `/api/getMat0053`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}