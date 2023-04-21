import sal0022Data from './mock/sal0022Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 품목 정보 조회
export function getSal0022Main(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(sal0022Data.sal0022Main).forEach((item, index) => {
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
            insCode: item.insCode,
            proCode: item.proCode,
            insType: item.insType,
            insMeth: item.insMeth,
            jugCodeh: item.jugCodeh,
            sampleQty1: item.sampleQty1,
            sampleQty2: item.sampleQty2,
            sampleQty3: item.sampleQty3,
            sampleQty4: item.sampleQty4,
            sampleQty5: item.sampleQty5,
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