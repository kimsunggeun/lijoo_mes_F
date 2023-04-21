import request from '@/utils/request'

// 작업표준서관리 리스트 조회
export function getDataList(param) {
  let data = param
  return request({
    url: `/api/bas0240/getDataList`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 작업표준서관리 파일 조회
export function getDataFile(param) {
  let data = param
  return request({
    url: `/api/bas0240/getDataFile`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 작업표준서관리 저장
export function saveData(param) {
  let data = param
  return request({
    url: `/api/bas0240/saveData`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 작업표준서관리 삭제
export function deleteData(param) {
  let data = param
  return request({
    url: `/api/bas0240/deleteData`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
