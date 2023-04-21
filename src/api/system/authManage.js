import authGroupData from './mock/authGroupData.json' // restful api를 사용하지 않을 경우
import authMenuData from './mock/authMenuData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 권한그룹 조회
export function getAuthGroup(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      authGroupData.list.forEach(item => {
        // console.log("item : " , item)
        if (item.domainCd === param.domainCd || param.domainCd === '') res.list.push(item)
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 입력/수정
export function createAuthGroup(param) {
  let data = param
  console.log(data[0].useYn)
  data[0].useYn = (data[0].useYn == true || data[0].useYn == 'Y') ? 'Y' : 'N'
  console.log(data[0].useYn)
  return request({
    url: `/com/createAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 정보 삭제
/* export function deleteAuthGroupData(param) {
  let data = param
  return request({
    url: `/api/deleteAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
} */

//권한메뉴 조회
export function getMenuAuthGroup(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let res = { list: [] }
      authMenuData.list.forEach(item => {
        if (
          (item.domainCd === param.domainCd || param.domainCd === '') &&
          (item.authgrpCd === param.authgrpCd || param.authgrpCd === '' || item.authgrpNm === param.authgrpNm || param.authgrpNm === '')
        ) {
          res.list.push(item)
        }
      })
      resolve(res)
    })
  }
  return request({
    url: `/com/getMenuAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한메뉴 입력/수정
export function createMenuAuthGroup(param) {
  let data = param
  return request({
    url: `/com/createMenuAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 권한그룹 정보 삭제
/* export function deleteMenuAuthGroup(param) {
  let data = param
  return request({
    url: `/api/deleteMenuAuthGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
} */
