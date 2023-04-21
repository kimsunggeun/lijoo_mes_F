import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 출력물설정 조회
export function getPrintInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/getPrintInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 실적등록 제약조건 조회
export function getConstInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/getConstInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 과입출비율 조회
export function getOverflowInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/getOverflowInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 대시보드관리 조회
export function getDashboardInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/getDashboardInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 출력물설정 수정
export function updatePrintInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/updatePrintInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 실적등록 제약조건 수정
export function updateConstInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/updateConstInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 과입출비율 수정
export function updateOverflowInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/updateOverflowInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 대시보드관리 수정
export function updateDashboardInfo(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  return request({
    url: `/com/updateDashboardInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
