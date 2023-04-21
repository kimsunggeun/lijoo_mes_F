import baseInfo from './mock/bas0042Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 경로정보 조회
export function getRouteInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function (resolve, reject) {
      let dataList = {
        list: []
      }
      _.cloneDeep(baseInfo.routeInfoDetail).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.partNo + index,
            pathType: item.pathType + index,
            pathCode: item.pathCode,
            pathNo: item.pathNo,
            proCode: item.proCode,
            matCost: item.matCost,
            proCost: item.proCost,
            labCost: item.labCost,
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
    url: `/api/bas0210/getRouteInfo`,
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

//경로정보 수정하기
export function updateRouteInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/updateRouteInfo`,
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

//경로코드명 가져오기
export function getPathCodeName(param) {
  let data = param
  return request({
    url: `/api/bas0210/getPathCodeName`,
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

//공장명 가져오기
export function getInWhcodeName(param) {
  let data = param
  return request({
    url: `/api/bas0210/getInWhcodeName`,
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

//공정코드명 가져오기
export function getProCodeName(param) {
  let data = param
  return request({
    url: `/api/bas0210/getProCodeName`,
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