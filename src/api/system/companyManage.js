import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 회사정보 조회
export function getCompany(param) {
  let isTest = false
  let data = param
  if (!isUseAPI() || isTest) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      /* _.cloneDeep(asgnData.treeList).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            domainCd: item.domainCd,
            asgnCd: item.asgnCd,
            asgnNm: item.asgnNm,
            prntsCd: item.prntsCd,
            sort: item.sort,
            level: item.level,
            asgnType: item.asgnType,
            note: item.note,
            insertDt: item.insertDt,
            insertId: item.insertId,
            updateDt: item.updateDt,
            updateId: item.updateId
          })
        }
      }) */
      resolve(dataList)
    })
  }
  return request({
    url: `/com/getCompany`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 공장정보 조회
export function getFacCode(param) {
  let data = param
  return request({
    url: `/com/getFacCode`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 회사정보 입력/수정
export function createCompany(param) {
  let data = param
  return request({
    url: `/com/createCompany`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 회사정보 삭제
/* export function deleteCompany(param) {
  let data = param
  return request({
    url: `/com/deleteCompany`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
} */
