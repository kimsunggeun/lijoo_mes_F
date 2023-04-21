import bas0010Data from './mock/bas0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [거래처별품목] 거래처명 조회
export function getCustomName(param) {
    let data = param
    return request({
      url: `/api/value=/bas0310/getCustomName`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }
// [거래처별품목] 거래처별 품목정보 조회
export function getItem(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/getItem`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [거래처별품목] 회사코드로 품목정보 마스터 가져오기
export function getPart(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/getPart`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//[거래처별품목] 
export function setCustPart(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/setCustPart`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//[거래처별품목] 회사코드, 품번, 거래처코드 필수입력 대상 삭제
export function delCustPart(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/delCustPart`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//[단가정보 조회] 회사코드, 거래처코드, 품번 필수
export function getPriceInfo(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/getPriceInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
//[단가정보 추가/수정] 회사코드, 거래처코드, 품번 필수, 단가적용시작일 필수 입력
export function setPriceInfo(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/setPriceInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

//[단가정보 삭제] 단가정보 삭제
export function delPriceInfo(param) {
  let data = param
  return request({
    url: `/api/value=/bas0310/delPriceInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}