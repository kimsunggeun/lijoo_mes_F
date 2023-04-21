import bas0010Data from './mock/bas0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [공통 코드] 조회
export function getBas0010Main(param) {
  let data = param
  if (!isUseAPI()) {
    console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }.cloneDeep(bas0010Data.bas0010Main).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            codeGr: item.codeGr,
            code: item.code,
            codeName: item.codeName,
            userFlag: item.userFlag,
            makeDate: item.makeDate,
            maker: item.maker,
            editDate: item.editDate,
            editor: item.editor
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/com/getCmCode`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
// [공통코드] 그리드 수정/추가
export function createCmCode(param) {
  let data = param
  return request({
    url: `/com/createCmCode`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
