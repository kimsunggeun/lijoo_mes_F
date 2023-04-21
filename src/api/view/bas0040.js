import baseInfo from './mock/bas0040Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'

// 품목선택 조회
export function getItemSelect(param) {
  if (!isUseAPI()) {
    return new Promise(function (resolve, reject) {
      let dataList = {
        list: []
      }
      .cloneDeep(baseInfo.itemInfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.partNo + index,
            partName: item.partName + index,
            spec: item.spec,
            itemType: item.itemType,
            partType: item.partType,
            unit: item.unit,
            inWh: item.inWh,
            outWh: item.outWh,
            lotSize: item.lotSize,
            safeCnt: item.safeCnt,
            inInsp: item.inInsp,
            proInsp: item.proInsp,
            rotInsp: item.rotInsp,
            outInsp: item.outInsp,
            lastInsp: item.lastInsp,
            outinsp: item.outinsp,
            leadTime: item.leadTime,
            weightYn: item.weightYn,
            weight: item.weight,
            userDef1: item.userDef1,
            userDef2: item.userDef2,
            userDef3: item.userDef3,
            userFlag: item.userFlag,
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
  let data = param
  return request({
    url: `/api/bas0210/getItemSelect`,
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

// 품목정보 조회
export function getItemInfo(param) {
  if (!isUseAPI()) {
    return new Promise(function (resolve, reject) {
      let dataList = {
        list: []
      }
      .cloneDeep(baseInfo.itemInfo).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: index,
            comCode: item.comCode,
            partNo: item.partNo + index,
            partName: item.partName + index,
            spec: item.spec,
            itemType: item.itemType,
            partType: item.partType,
            unit: item.unit,
            inWh: item.inWh,
            outWh: item.outWh,
            lotSize: item.lotSize,
            safeCnt: item.safeCnt,
            inInsp: item.inInsp,
            proInsp: item.proInsp,
            rotInsp: item.rotInsp,
            outInsp: item.outInsp,
            lastInsp: item.lastInsp,
            outinsp: item.outinsp,
            leadTime: item.leadTime,
            weightYn: item.weightYn,
            weight: item.weight,
            userDef1: item.userDef1,
            userDef2: item.userDef2,
            userDef3: item.userDef3,
            userFlag: item.userFlag,
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
  let data = param
  return request({
    url: `/api/bas0210/getItemInfo`,
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

//품목정보 저장
export function saveItemInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/saveItemInfo`,
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

//품목정보 수정
export function updateItemInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/updateItemInfo`,
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

//품목정보 삭제
export function deleteItemInfo(param) {
  let data = param
  return request({
    url: `/api/bas0210/deleteItemInfo`,
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