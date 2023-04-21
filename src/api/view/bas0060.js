import bas0060Data from './mock/bas0060Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 검사 유형 조회
export function getCheckTypeInfo(param) {

  let data = param

  return request({
    url: `/api/getMenuByDomain`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 검사 유형 추가 및 수정
export function createpathDetail(param) {

  let data = param

  return request({
    url: `/api/getMenuByDomain`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}