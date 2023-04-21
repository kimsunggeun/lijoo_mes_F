import baseInfo from './mock/sal0010Data' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import {
  isUseAPI
} from '@/utils/check'
//구매발주생성(mat0020.vue화면)
export function getAccount(param) {
  let data = param
  return request({
    url: `/com/getAccount`,
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