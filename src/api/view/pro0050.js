
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'


 
// [pro0050] 그리드 조회
export function getPro0050(param) {
  let data = param
  return request({
    url: `/api/getPro0050`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data 
  })
}
// [pro0050] 그리드 수정/추가
export function createPro0050(param) {
  let data = param
  return request({ 
    url: `/api/createPro0050`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [pro0050] 그리드 삭제
export function delPro0050(param) {
  let data = param
  return request({
    url: `/api/delPro0050`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [pro0050] 그리드 팝업
export function getPartInfo(param) {
  let data = param
  return request({
    url: `/api/getPartInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [pro0050] 라우팅정보
export function getPathInfo(param) {
  let data = param
  return request({
    url: `/api/getPathInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

export function getPathWorkInfo(param) {
  let data = param
  return request({
    url: `/api/getPathWorkInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [pro0050] 작업반 코드
export function getBas0035(param) {
  let data = param
  return request({
    url: `/api/getBas0035`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [pro0050] 작업장 코드
export function getBas0034(param) {
  let data = param
  return request({
    url: `/api/getBas0034`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [pro0050] 작업지시관리 상태 변경
export function ordState(param) {
  let data = param
  return request({
    url: `/api/ordState`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
