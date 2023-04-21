import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//구매입고등록 정보
export function getMat0013Info(param) {
  let data = param

  return request({
    url: `/api/getMat0013`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매입고등록 추가 및 수정
export function createMat0013(param) {
  let data = param
  return request({
    url: `/api/createMat0013`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//구매입고등록 삭제
export function deleteMat0013(param) {
  let data = param
  return request({
    url: `/api/deleteMat0013`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 거래처 정보 팝업 정보 조회
export function getAccount(param) {
  let data = param

  return request({
    url: `/com/getAccount`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [거래처별품목] 회사코드로 품목정보 마스터 가져오기
export function getPartNo(param) {
  let data = param
  return request({
    url: `/api/getPartNo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 입고창고 조회
export function getInWh(param) {
  let data = param
  return request({
    url: `/api/getInWh`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

