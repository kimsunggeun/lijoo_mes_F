import baseInfo from './mock/bas0320Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 품목 정보 조회
export function getExchangeRateInfo(param) {
  //console.log("getCompanyInfoData(param) : ", param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(baseInfo.exchangeRateInfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            currDate: item.currDate,
            currCode: item.currCode,
            price: item.price,
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
    url: `/api/bas0320/getExrateInfoManage`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

export function setExrateInfoManage(param) {
  //console.log("setExrateInfoManage(param) : ", param)
  let data = param

  return request({
    url: `/api/bas0320/setExrateInfoManage`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}