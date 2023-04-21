
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [공장월력] 회사코드에 맞는 근무시간,휴게시간 정보 가져오기
export function getWorkTime(param) {
    let data = param
    return request({
      url: `/api/summary=/bas0130/getWorkTime`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }
// [공장월력] created = true 입력/modified = true 수정
export function setWorkTime(param) {
  let data = param
  return request({
    url: `/api/summary=/bas0130/setWorkTime`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
// [공장월력] 근무시간/휴게시간 삭제
export function delWorkTime(param) {
  let data = param
  return request({
    url: `/api/summary=/bas0130/delWorkTime`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
//[근무일 조회] 
export function getWorkDate(param) {
  let data = param
  return request({
    url: `/api/summary=/bas0130/getWorkDate`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
//[근무일] 입력수정
export function setWorkDate(param) {
  let data = param
  return request({ 
    url: `/api/summary=/bas0130/setWorkDate`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}

//[근무일] 삭제
export function delWorkDate(param) {
  let data = param
  return request({
    url: `/api/summary=/bas0130/delWorkDate`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
//[공장월력] 생성
export function setMonthData(param) {
  let data = param
  return request({
    url: `/api/summary=/bas0130/setMonthData`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}

