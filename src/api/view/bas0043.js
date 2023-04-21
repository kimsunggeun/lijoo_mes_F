import baseInfo from './mock/bas0043Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// BOM정보 조회
// export function getBomInfo(param) {
//   //console.log("getCompanyInfoData(param) : "+ param)
//   let data = param
//   if (!isUseAPI()) {
//     return new Promise(function (resolve, reject) {
//       let dataList = {
//         list: []
//       }
//       _.cloneDeep(baseInfo.bomInfo).forEach((item, index) => {
//         if (item.domainCd === param.domainCd) {
//           dataList.list.push({
//             id: index,
//             comCode: item.comCode,
//             partNo: item.partNo + index,
//             pathType: item.pathType + index,
//             pathCode: item.pathCode,
//             pathNo: item.pathNo,
//             proCode: item.proCode,
//             level: item.level,
//             no: item.no,
//             childpartNo: item.childpartNo,
//             amount: item.amount,
//             userFlag: item.userFlag,
//             remark: item.remark,
//             makeDate: item.makeDate,
//             maker: item.maker,
//             editDate: item.editDate,
//             editor: item.editor,
//           })
//         }
//       })
//       resolve(dataList)
//     })
//   }
//   return request({
//     url: `/api/bas0210/getBomInfo`,
//     method: 'POST',
//     meta: {
//       apiVersion: '1.0.0'
//     },
//     headers: {
//       'Content-Type': 'application/json;charset=utf8'
//     },
//     data
//   })
// }

// BOM정보 조회
export function getBomInfo(param) {
  let data = param
  return request({
    url: `/api/bas0215/getBomInfo`,
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

// BOM정보 저장
export function saveBomInfo(param) {
  let data = param
  return request({
    url: `/api/bas0215/saveBomInfo`,
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

// BOM정보 삭제
export function deleteBomInfo(param) {
  let data = param
  return request({
    url: `/api/bas0215/deleteBomInfo`,
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