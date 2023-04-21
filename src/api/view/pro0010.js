
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [공통 코드] 조회
export function getPro0010(param) {
  let data = param
  return request({
    url: `/api/getPro0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [작지대상품목] 조회
export function getPro0010Detail(param) {
  let data = param
  return request({
    url: `/api/getPro0010Detail`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [pro0010(작지대상품목)] 그리드 수정/추가
export function upsertPro0010(param) {
  let data = param 
  return request({
    url: `/api/upsertPro0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}


export function deletePro0010(param) {
  let data = param 
  return request({
    url: `/api/deletePro0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [품목군,제품군] 조회
export function getBas0040(param) {
  let data = param
  return request({
    url: `/api/getBas0040`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}