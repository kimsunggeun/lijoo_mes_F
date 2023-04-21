import request from '@/utils/request'


//전산번호 조회
export function getPop0310(param) {
  let data = param
  console.log('eeeee', data)
  return request({
    url: `/api/pop/getPop0310`,
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

//품목코드 조회
export function getpartNo(param) {
  let data = param
  return request({
    url: `/api/pop/getpartNo`,
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

//창고명 조회
export function getwhNm(param) {
  let data = param
  return request({
    url: `/api/pop/getwhNm`,
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

//작업장 조회
export function getwork(param) {
  let data = param
  return request({
    url: `/api/pop/getwork`,
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

//재공조회
export function getWorkProcess(param) {
  let data = param
  return request({
    url: `/api/pop/getWorkProcess`,
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
//재고조회
export function getstock(param) {
  let data = param
  return request({
    url: `/api/pop/getstock`,
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

//분할정보등록 저장
export function createMat0021(param) {
  let data = param
  console.log('saveParam', data)
  return request({
    url: `/api/pop/createMat0021`,
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

//분할정보등록 수정
export function updateMat0021(param) {
  let data = param
  console.log('saveParam', data)
  return request({
    url: `/api/pop/updateMat0021`,
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