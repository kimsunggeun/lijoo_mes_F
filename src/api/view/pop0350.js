import request from '@/utils/request'


//경로유형 조회
export function getPathCode(param) {
  let data = param
  return request({
    url: `/api/pop0350/getPathCode`,
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

//공정코드 조회
export function getProCode(param) {
  let data = param
  return request({
    url: `/api/pop0350/getProCode`,
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

//작업반 조회
export function getWorkDecode(param) {
  let data = param
  return request({
    url: `/api/pop0350/getWorkDecode`,
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
//작업반 조회(LookUp)
export function getWorkDecode2(param) {
  let data = param
  return request({
    url: `/api/pop0350/getWorkDecode2`,
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


//로트정보 추가
export function createPro0026(param) {
  let data = param
  return request({
    url: `/api/pop0350/createPro0026`,
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


