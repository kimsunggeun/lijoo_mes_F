import request from '@/utils/request'


//출하전표 조회
export function getSal0130(param) {
  let data = param 
  return request({
    url: `/api/getSal0130`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}


//출하로트현황 조회
export function getOutStatus(param) {
  let data = param 
  return request({
    url: `/api/getOutStatus`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//출하로트현황 조회
export function getInspection(param) {
  let data = param 
  return request({
    url: `/api/getInspection`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//검사내역 저장
export function createSal0130(param) {
  let data = param 
  console.log('data',data)
  return request({
    url: `/api/createSal0130`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//검사내역 삭제
export function delSal0130(param) {
  let data = param 
  console.log('data',data)
  return request({
    url: `/api/delSal0130`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

