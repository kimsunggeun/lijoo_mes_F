import menuData from './mock/menuData' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// Router 메뉴 조회
export function getRouterMenu(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    // console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(menuData.menus).forEach((item, index) => {
        if (item.comCode === param.comCode) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            proCode: item.proCode,
            sysType: item.sysType,
            menuCode: item.menuCode,
            moduleCode: item.moduleCode,
            menuName: item.menuName,
            paCode: item.paCode,
            pgCode: item.pgCode,
            sortFlag: item.sortFlag,
            icon: 'folder',
            userFlag: item.userFlag
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/com/getRouterMenu`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴 정보 조회
export function getAllMenu(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(menuData.menus).forEach((item, index) => {
        if (item.comCode === param.comCode) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            proCode: item.proCode,
            sysType: item.sysType,
            menuCode: item.menuCode,
            moduleCode: item.moduleCode,
            menuName: item.menuName,
            paCode: item.paCode,
            pgCode: item.pgCode,
            sortFlag: item.sortFlag,
            icon: 'folder',
            userFlag: item.userFlag
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/com/getAllMenu`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 사용자 메뉴 조회
export function getUserMenu(param) {
  //console.log("getMenuData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    console.log('Get Menu API Mock-up')
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(menuData.menus).forEach((item, index) => {
        if (item.comCode === param.comCode) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            proCode: item.proCode,
            sysType: item.sysType,
            menuCode: item.menuCode,
            moduleCode: item.moduleCode,
            menuName: item.menuName,
            paCode: item.paCode,
            pgCode: item.pgCode,
            sortFlag: item.sortFlag,
            icon: 'folder',
            userFlag: item.userFlag
          })
        }
      })
      resolve(dataList)
    })
  }
  return request({
    url: `/com/getUserMenu`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴리스트 입력/수정
export function createMenu(param) {
  let data = param
  return request({
    url: `/com/createMenu`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// 메뉴 정보 삭제
/* export function deleteMenuData(param) {
  let data = param
  return request({
    url: `/api/deleteMenu`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
} */
