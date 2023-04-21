import request from '@/utils/request'

// 거래처 정보 조회
export function getAccountInfo(param) {
  let data = param

  return request({
    url: `/api/bas0020/getAccountInfo`,
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

// 거래처 정보 중복값
export function getCustCode(param) {
  let data = param

  return request({
    url: `/api/bas0020/getCustCode`,
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

// 거래처 정보 저장
export function saveAccountInfo(param) {
  let data = param

  return request({
    url: `/api/bas0020/saveAccountInfo`,
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

// 품목정보 업로드
export function getPartTypeInfo(param) {
  let data = param

  return request({
    url: `/api/bas0020/getPartTypeInfo`,
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

// 품목정보 중복값
export function partTypeOverlap(param) {
  let data = param

  return request({
    url: `/api/bas0020/partTypeOverlap`,
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

// 품목정보 업로드 저장
export function savePartTypeInfo(param) {
  let data = param

  return request({
    url: `/api/bas0020/savePartTypeInfo`,
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

// BOM정보 업로드 
export function getBomInfo(param) {
  let data = param

  return request({
    url: `/api/bas0020/getBomInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type' : 'application/json;charset=utf8'
    },
    data
  })
}

// BOM정보 업로드 저장
export function saveBomInfo(param) {
  let data = param
  
  return request({
    url: `/api/bas0020/saveBomInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type' : 'application/json;charset=utf8'
    },
    data
  })
}

// 거래처별 품목 정보 업로드
export function getItemByCustInfo(param) {
  let data = param
  return request({
    url: `/api/bas0020/getItemByCustInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type' : 'application/json;charset=utf8'
    },
    data
  })
}

//거래처별 품목 정보 저장
export function saveItemByCustInfo(param) {
  let data = param
  return request({
    url: `/api/bas0020/saveItemByCustInfo`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type' : 'application/json;charset=utf8'
    },
    data
  })
}

//거래처별 품목 정보 중복값
export function itemByCustOverlap(param) {
  let data = param
  return request({
    url: `/api/bas0020/itemByCustOverlap`,
    method: 'POST',
    meta: {
      apiVersion: '1.0.0'
    },
    headers: {
      'Content-Type' : 'application/json;charset=utf8'
    },
    data
  })
}

