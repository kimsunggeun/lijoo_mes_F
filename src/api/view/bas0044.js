import baseInfo from './mock/bas0044Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 품목별거래처정보 조회
export function getItemCustomInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function (resolve, reject) {
      let dataList = {
        list: []
      }
      _.cloneDeep(baseInfo.accountInfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.partNo + index,
            custCode: item.custCode + index,
            lotSize: item.lotSize,
            inInsp: item.inInsp,
            outInsp: item.outInsp,
            supInsp: item.supInsp,
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
    url: `/api/bas0210/getItemCustomInfo`,
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
//거래처명 가져오기
export function getCustCodeName(param) {
  let data = param
  return request({
    url: `/api/bas0210/getCustCodeName`,
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
//품목별 거래처정보 save
export function saveItemCustomInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/saveItemCustomInfo`,
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

//품목별 거래처정보 delete
export function deleteCustomInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/deleteCustomInfo`,
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

//[팝업 거래처 정보 가져오기]
export function getCustPop(param) {
  let data = param
  return request({
    url: `/api/bas0210/getCustPop`,
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