import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//구매입고등록 정보
export function getMat0012Info(param) {
  let data = param

  return request({
    url: `/api/getMat0012`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매입고등록 추가 및 수정
export function createMat0012(param) {
  let data = param
  return request({
    url: `/api/createMat0012`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매입고등록 삭제
export function deleteMat0012(param) {
  let data = param
  return request({
    url: `/api/deleteMat0012`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

