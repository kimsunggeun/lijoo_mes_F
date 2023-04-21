import sal0023Data from './mock/sal0023Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 품목 정보 조회
export function getSal0023Main(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(sal0023Data.sal0023Main).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode, 
            facCode: item.facCode,
            ordNo: item.ordNo,
            ilNo: item.ilNo,
            no: item.no,  
            lotNo: item.lotNo, 
            lotDetail: item.lotDetail, 
            retLotNo: item.retLotNo,
            retLotDetail: item.retLotDetail, 
            retCode: item.retCode,
            retType: item.retType,  
            whCode: item.whCode, 
            partNo: item.partNo, 
            retQty:item.retQty, 
            remark:item.remark, 
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