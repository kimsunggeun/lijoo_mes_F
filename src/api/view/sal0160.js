import request from '@/utils/request'

// 출하등록 데이터 조회
export function getSal0120(param) {
  let data = param
  return request({
    url: `/api/sal0160/getSal0120`,
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
//거래명세표 출력
export function exportTransRpt(param){
  // html 이미지 출력 문제로 보류
  // let responseType = params.type !== "html" ? "blob" : "stream"
  let data = param
  let responseType = "blob"
  
  return request({
    url:`/api/sal0160/exportTransRpt`,
    method:'POST',
    meta:{apiVersion:'1.0.0'},
    headers:{ 'Content-Type': 'application/json;charset=utf8' },
    data,
    responseType: responseType
  })
}