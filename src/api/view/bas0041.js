import baseInfo from './mock/bas0041Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 경로유형 조회
export function getPathType(param) {
  let data = param
  if (!isUseAPI()) {
    return new Promise(function (resolve, reject) {
      let dataList = {
        list: []
      }
      _.cloneDeep(baseInfo.routeInfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.partNo + index,
            pathType: item.pathType + index,
            pathCode: item.pathCode,
            inWhcode: item.inWhcode,
            sortFlag: item.sortFlag,
            userFlag: item.userFlag,
            remark: item.remark,
            makeDate: item.makeDate,
            maker: item.maker,
            editDate: item.editDate,
            editor: item.editor,
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/api/bas0210/getPathType`,
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

// 경로명 가져오기
export function getPathCode(param) {
  let data = param
  return request({
    url: `/api/bas0210/getPathCode`,
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

// 경로명 가져오기
export function getInWhCode(param) {
  let data = param
  return request({
    url: `/api/bas0210/getInWhCode`,
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

//경로유형 저장
export function savePathType(param) {
  let data = param
  return request({
    url: `/api/bas0210/savePathType`,
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

//경로유형 삭제
export function deletePathType(param) {
  let data = param
  return request({
    url: `/api/bas0210/deletePathType`,
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