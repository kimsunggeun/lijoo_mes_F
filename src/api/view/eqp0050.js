import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 수리현황 조회
export function getFacilityStatusItem(param) {
    let data = param
    return request({
        url: `/api/getFacilityStatusItem`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

// 점검항목 조회
export function getChecklistItem(param) {
  let data = param
  return request({
      url: `/api/getChecklistItem`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
  })
}

// 예비품정보 조회
export function getSparpartInfo(param) {
    let data = param
    return request({
        url: `/api/getSparpartInfo`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
  }

  // 예비품별 자원정보 조회
export function getSparpartResInfo(param) {
    let data = param
    return request({
        url: `/api/getSparpartResInfo`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
  }