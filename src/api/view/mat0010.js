import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//구매발주 정보
export function getMat0010Info(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/getMat0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주 정보
export function getMat0011toOut0110(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/getMat0011toOut0110`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주 정보
export function getMat0011byDate(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/getMat0011byDate`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주 정보_MAT0030
export function getMat0010Info_Mat0030(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param

  return request({
    url: `/api/getMat0010Info_Mat0030`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주 정보 추가 및 수정
export function createMat0010(param) {
  let data = param

  return request({
    url: `/api/createMat0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주정보 확정
export function confirmMat0010(param) {
  let data = param

  return request({
    url: `/api/confirmMat0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매발주정보 확정 취소
export function confirmCancelMat0010(param) {
  let data = param

  return request({
    url: `/api/confirmCancelMat0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//구매발주 정보 삭제
export function deleteMat0010(param) {
  let data = param

  return request({
    url: `/api/deleteMat0010`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 품목 정보 조회
export function getItemInfo(param) {
  let data = param

  return request({
    url: `/api/getItemInfo2`,
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

