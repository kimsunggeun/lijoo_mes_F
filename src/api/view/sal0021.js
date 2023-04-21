import sal0021Data from './mock/sal0021Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 품목 정보 조회
export function getSal0021Main(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(sal0021Data.sal0021Main).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            facCode: item.facCode,
            ordNo: item.ordNo,
            ilNo: item.price,
            no: item.no,
            outDate: item.outDate,
            custCode: item.custCode,
            partNo: item.partNo,
            lotNo: item.lotNo,
            lotDetail: item.lotDetail,
            qty: item.qty,
            price: item.price,
            amount: item.amount,
            closeMonth: item.closeMonth,
            closeYn: item.closeYn,
            confirmYn: item.confirmYn,
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
    url: `/api/getMenuByDomain`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}