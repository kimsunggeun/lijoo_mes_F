import request from '@/utils/request'

//입고번호에 의한 납품정보 상세 조회
export function getMat0018(param) {
  let data = param
  return request({
    url: `/api/pop/getMat0018`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//전표스캔에 의한 납품정보 상세 조회
export function getMat0018_Scan(param) {
  let data = param
  return request({
    url: `/api/pop/getMat0018_Scan`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//전산번호 스캔에 의한 납품정보 상세 조회
export function getMat0018_LotScan(param) {
  let data = param
  return request({
    url: `/api/pop/getMat0018_LotScan`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//외주업체 거래처코드 조회
export function updateMat0018(param) {
  let data = param
  return request({
    url: `/api/pop/updateMat0018`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//외주업체 거래처코드 조회
export function getIlno(param) {
  let data = param
  return request({
    url: `/api/pop/getIlno`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
