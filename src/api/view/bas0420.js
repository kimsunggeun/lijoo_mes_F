
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

//[품질기준마스터]회사코드에 맞는 검사유형정보 가져오기
export function getInspecType(param) {
    let data = param
    return request({
      url: `/api/bas0420/getInspecType`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }


//[품질기준마스터]회사코드에 맞는 검사유형정보 가져오기
export function getQuaStanInfo(param) {
    let data = param
    return request({
      url: `/api/bas0420/getQuaStanInfo`,
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data
    }) 
  }

  //[품질기준마스터] created = true 입력/modified = true 수정
export function setQuaStanInfo(param) {
  let data = param
  return request({
    url: `/api/bas0420/setQuaStanInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
 
//[품질기준마스터] 품질기준정보 삭제
export function delQuaStanInfo(param) {
  let data = param
  return request({
    url: `/api/bas0420/delQuaStanInfo`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
  
    //[품질기준정보 품목리스트]
export function getPartList(param) {
  let data = param
  return request({
    url: `/api/bas0420/getPartList`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
  
//복사 
export function setPartCopy(param) {
  let data = param
  return request({
    url: `/api/bas0420/setPartCopy`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  }) 
}
  
  
  
