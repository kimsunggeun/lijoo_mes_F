import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//구매발주 상세 정보
export function getMat0011Info(param) {
  let data = param

  return request({
    url: `/api/getMat0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주 상세 정보 추가 및 수정
export function createMat0011(param) {
  let data = param

  return request({
    url: `/api/createMat0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주 상세 정보 삭제
export function deleteMat0011(param) {
  let data = param

  return request({
    url: `/api/deleteMat0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

