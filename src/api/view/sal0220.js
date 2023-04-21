
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// [기간별출하현황] 출하실적 조회
export function getSal0220(param) {
  let data = param 
  console.log("asdasd",param)
  return request({
    url: `/api/getSal0220`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [기간별출하현황] 기타출고 조회
export function getSal0220OtherRelease(param) {
  let data = param 
  console.log("asdasd",param)
  return request({
    url: `/api/getSal0220OtherRelease`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

// [기간별출하현황] 기타출고 삭제
export function deleteSal0220OhterRelease(param) {
  let data = param 
  console.log("asdasd",param)
  return request({
    url: `/api/deleteSal0220OhterRelease`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}

