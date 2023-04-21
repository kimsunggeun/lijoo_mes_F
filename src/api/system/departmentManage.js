import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 부서정보 조회
export function getDepartment(param) {
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
    url: `/com/getDepartment`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 부서코드 중복확인
export function checkDepartmentCd(param) {
  let data = param
  return request({
    url: `/com/checkDepartmentCd`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 부서코드 입력/수정
export function createDepartment(param) {
  let data = param
  return request({
    url: `/com/createDepartment`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 부서코드 삭제
export function deleteDepartment(param) {
  let data = param
  return request({
    url: `/com/deleteDepartment`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
