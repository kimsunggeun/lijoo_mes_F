import baseInfo from './mock/sys0021Data' // restful api를 사용하지 않을 경우
import menuData from '@/api/system/mock/menuData' // 
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 품목 정보 조회
export function getMenuList(param) {
  //console.log("getCompanyInfoData(param) : "+ param)
  let data = param
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let dataList = { list: [] }
      _.cloneDeep(baseInfo.GroupMenuManageDetails).forEach((item, index) => {
        if (item.domainCd === param.domainCd) {
          dataList.list.push({
            id: item.id,
            // comCode: item.comCode,
            // sysType: item.sysType,
            // perCode: item.perCode,
            menuCode: item.menuCode,
            // userFlag: item.userFlag,
            // makeDate: item.makeDate,
            // maker: item.maker,
            // editDate: item.editDate,
            // editor: item.editor,
            HeadId: item.HeadId,
          })
        }
      })
      let cnt = dataList.list.length
      menuData.menus.forEach(e => {
        if(e.pgCode !== null) {
          dataList.list.push({
            id: cnt++,
            menuCode: e.menuCode,
            HeadId: e.paCode,
          })
        } 
      });
      resolve(dataList)
    })
  }
  return request({
    url: `/com/getMenuByDomain`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}