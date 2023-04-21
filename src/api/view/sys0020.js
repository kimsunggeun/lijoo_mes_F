import baseInfo from './mock/sys0020Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 권한그룹정보 조회
export function getAuthGroup(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(baseInfo.permissioninfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            sysType: item.sysType,
            perCode: item.perCode,
            perName: item.perName,
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
    url: `/com/getAuthGroup`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 권한그룹정보 수정
export function createAuthGroup(param, isProgress) {
  let data = param
  return request({
    url: `/com/createAuthGroup`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴정보 조회
export function getMenuAuthGroup(param, isProgress) {
  let data = param
  return request({
    url: `/com/getMenuAuthGroup`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴정보 수정
export function createMenuAuthGroup(param, isProgress) {
  let data = param
  return request({
    url: `/com/createMenuAuthGroup`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
