import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 수리내역 조회
export function getFacilityItem(param) {
    let data = param
    return request({
        url: `/api/getFacilityItem`,
        method: 'POST',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        data
    })
}

// 수리내역 저장/업데이트
export function createEqp0050(param) {
    let data = param  
    return request({
      url: `/api/createEqp0050`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    })
  }

  // 수리내역 삭제
export function deleteEqp0050(param) {
    let data = param  
    return request({
      url: `/api/deleteEqp0050`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    })
  }