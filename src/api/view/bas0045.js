import baseInfo from './mock/bas0045Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 단가정보 조회
export function getPriceInfo(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function (resolve, reject) {
      let dataList = {
        list: []
      }
      _.cloneDeep(baseInfo.priceInfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.partNo + index,
            custCode: item.custCode + index,
            appDate: item.appDate,
            appYn: item.appYn,
            price: item.price,
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
    url: `/api/bas0210/getPriceInfo`,
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

// 단가정보 SAVE
export function savePriceInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/savePriceInfo`,
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

// 단가정보 SAVE
export function deletePriceInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/deletePriceInfo`,
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