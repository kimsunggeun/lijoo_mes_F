import baseInfo from './mock/sal0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 수주 정보 조회
export function getOrderInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/getSal0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 수주 정보 저장
export function createOrderInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/createSal0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 수주 정보 확정
export function confirmOrderInfo(param) {
  let data = param

  return request({
    url: `/api/confirmSal0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 수주 정보 확정 취소
export function confirmCancelOrderInfo(param) {
  let data = param

  return request({
    url: `/api/confirmCancelSal0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 수주 정보 삭제
export function deleteOrderInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/deleteSal0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 거래처 정보 팝업 정보 조회
export function getAccount(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/com/getAccount`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 품목 정보 조회
export function getItemInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/getItemInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

