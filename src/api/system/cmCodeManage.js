import cmCodeData from './mock/cmCodeData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 공통코드 정보 조회
export function getCmCode(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      cmCodeData.data.forEach(item => {
        if (item.prntsCd === param.prntsCd && param.level === '1') {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 공통코드 상세 조회
export function getCmChildCode(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      cmCodeData.data.forEach(item => {
        if (item.prntsCd === param.prntsCd && param.level === '1') {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getCmChildCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 공통코드 수정/추가
export function createCmCode(param) {
  let data = param
  return request({
    url: `/com/createCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 공통코드 상세 수정/추가
export function createCmChildCode(param) {
  let data = param
  return request({
    url: `/com/createChildCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 공통코드 삭제
export function deleteCmCode(param) {
  let data = param
  return request({
    url: `/com/delCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

export function deleteCmChildCode(param) {
  let data = param
  return request({
    url: `/com/delChildCmCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
