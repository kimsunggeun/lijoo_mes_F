import baseInfo from './mock/sal0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

export function getMat0012Info(param) {
  let data = param
  console.log('api1_data', data)
  return request({
    url: `/api/Mat0070/getMat0012`,
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

export function getMat0018Info(param) {
  let data = param
  console.log('api2_data', data)
  return request({
    url: `/api/Mat0070/getMat0018`,
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

export function getAccount(param) {
  let data = param
  return request({
    url: `/com/getAccount`,
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

export function exportTransRpt(param){
  // html 이미지 출력 문제로 보류
  // let responseType = params.type !== "html" ? "blob" : "stream"
  let data = param
  let responseType = "blob"
  
  return request({
    url:`/api/Mat0070/exportTransRpt`,
    method:'POST',
    meta:{apiVersion:'1.0.0'},
    headers:{ 'Content-Type': 'application/json;charset=utf8' },
    data,
    responseType: responseType
  })
}

export function exportTransTagRpt(param){
  // html 이미지 출력 문제로 보류
  // let responseType = params.type !== "html" ? "blob" : "stream"
  let data = param
  let responseType = "blob"
  
  return request({
    url:`/api/Mat0070/exportTransTagRpt`,
    method:'POST',
    meta:{apiVersion:'1.0.0'},
    headers:{ 'Content-Type': 'application/json;charset=utf8' },
    data,
    responseType: responseType
  })
}
