import request from '@/utils/request'

//예비품 정보 조회
export function getMainList(param) {
  let data = param

  return request({
    url: `/api/bas0260/getMainList`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//예비품별 자원정보 조회
export function getDetailList(param) {
  let data = param

  return request({
    url: `/api/bas0260/getDetailList`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 예비품 정보 저장
export function saveReserveStockInfo(param) {
  let data = param

  return request({
    url: `/api/bas0260/saveReserveStockInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 예비품별 자원정보 저장
export function saveReserveStockDetailInfo(param) {
  let data = param

  return request({
    url: `/api/bas0260/saveReserveStockDetailInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 예비품 정보 삭제
export function deleteReserveStockInfo(param) {
  let data = param

  return request({
    url: `/api/bas0260/deleteReserveStockInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type': 'application/json;charset=utf8'
    },
    data
  })
}

// 예비품별 자원정보 삭제
export function deleteReserveStockDetailInfo(param) {
  let data = param

  return request({
    url: `/api/bas0260/deleteReserveStockDetailInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type': 'application/json;charset=utf8'
    },
    data
  })
}