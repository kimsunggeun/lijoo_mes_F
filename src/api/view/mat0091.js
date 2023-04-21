import baseInfo from './mock/sal0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

export function createMat0091(param) {
  let data = param
  return request({
    url: `/api/createMat0091`,
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

export function getMat0091(param) {
  let data = param
  return request({
    url: `/api/getMat0091`,
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
