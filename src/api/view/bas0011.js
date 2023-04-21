import bas0011Data from './mock/bas0011Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [공통코드 상세] 조회
export function getBas0011Detail(param) {
  let data = param
  if (!isUseAPI()) {
    console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      .cloneDeep(bas0011Data.bas0011Detail).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            codeGr: item.codeGr,
            code: item.code,
            sysCode: item.sysCode,
            sysName: item.sysName,
            sortFlag: item.sortFlag,
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
    url: `/com/getCmChildCode`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [공통코드 상세] 그리드 수정/추가
export function createChildCmCode(param) {

  let data = param
  return request({
    url: `/com/createChildCmCode`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}