import request from '@/utils/request'


//창고코드 조회
export function getOutWh(param) {
  let data = param
  console.log("데이터 확인", data)
  return request({
    url: `/api/pop/pop0040/getOutWh`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//품번, 품명 조회
export function getPartNo(param) {
  let data = param
  console.log("데이터 확인 품번 품명", data)
  return request({
    url: `/api/pop/pop0040/getPartNo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//재고마스터 상세 조회
export function getMat0021(param) {
  let data = param
  return request({
    url: `/api/pop/pop0040/getMat0021`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//창고 이동
export function createMat0020(param) {
  let data = param
  return request({
    url: `/api/pop/pop0040/createMat0020`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//창고 이동 내역 저장
export function createMat0031(param) {
  let data = param
  console.log('param', data)
  return request({
    url: `/api/pop/pop0040/createMat0031`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

