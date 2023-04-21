import userManageData from './mock/userManage.json' // restful api를 사용하지 않을 경우
import loginData from '../common/mock/login.json' 
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 사원정보 조회
export function getUser(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      userManageData.list.forEach(item => {
        if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// ID 중복 체크
export function checkByUserId(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      /* userManageData.asgn.forEach(item => {
        if (item.asgnCd === param.asgnCd || param.asgnCd === '') res.list.push(item)
      }) */
      resolve(res)

    })
  }
  return request({
    url: `/com/checkByUserId`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 사용자 비밀번호 초기화
export function initUserPass(param) {
  let data = param
  return request({
    url: `/com/initUserPass`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 사용자 비밀번호 변경
export function updateUserPass(param) { //작성중
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
     /*  userManageData.userType.forEach(item => {
        if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
      }) */
      resolve(res)
    })
  }
  return request({
    url: `/com/updateUserPass`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 사원정보 입력/수정
export function createUser(param) {
  let data = param
  // data[0].useYn = (data[0].useYn == true || data[0].useYn == 'Y') ? 'Y' : 'N'
  return request({
    url: `/com/createUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 사원정보 삭제
export function deleteUser(param) {
  let data = param
  return request({
    url: `/com/deleteUser`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 공장명 콤보박스 정보
export function getFacInfo(param) {
  let data = param
  return request({
    url: `/api/bas0120/getFacInfo`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}