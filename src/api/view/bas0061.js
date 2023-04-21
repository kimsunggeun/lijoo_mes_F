import bas0061Data from './mock/bas0061Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 회사 정보 조회
export function getQualityMasterInfoData(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(bas0061Data.bas0061Main).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.insCode,
            inspNo: item.inspNo,
            insCode: item.insCode,
            insType: item.insType,
            insMeth: item.insMeth,
            jugCodeh: item.jugCodeh,
            insUnit: item.insUnit,
            insBase: item.insBase,
            insUpp: item.insUpp,
            insLow: item.insLow,
            insCnt: item.insCnt,
            remark: item.remark,
            userFlag: item.userFlag,
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
    url: `/api/getMenuByDomain`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
