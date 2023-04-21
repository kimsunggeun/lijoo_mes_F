import baseInfo from './mock/sal0011Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 수주 세부 정보 조회
export function getOrderDetailInfo(param) {
  let data = param

  return request({
    url: `/api/getSal0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 수주 세부 정보 저장 및 수정
export function createOrderDetail(param) {
  let data = param

  return request({
    url: `/api/createSal0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 수주 세부 정보 삭제
export function deleteOrderDetail(param) {
  let data = param

  return request({
    url: `/api/deleteSal0011`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}