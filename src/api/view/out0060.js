import request from '@/utils/request'

//공정외주 납품등록 조회
export function getOut0060VO(param) {
  let data = param
  return request({
    url: `/api/out0060/getOut0060VO`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}
export function geOut0060DVO(param) {
  let data = param
  return request({
    url: `/api/out0060/geOut0060DVO`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data
  })
}









//거래명세표 출력
export function exportTransTagRpt(param){
  // html 이미지 출력 문제로 보류
  // let responseType = params.type !== "html" ? "blob" : "stream"
  let data = param
  let responseType = "blob"
  
  return request({
    url:`/api/out0060/Out0060/exportTransTagRpt`,
    method:'POST',
    meta:{apiVersion:'1.0.0'},
    headers:{ 'Content-Type': 'application/json;charset=utf8' },
    data,
    responseType: responseType
  })
}
//외주자재출고증 출력
export function exportTransRpt(param){
  // html 이미지 출력 문제로 보류
  // let responseType = params.type !== "html" ? "blob" : "stream"
  let data = param
  let responseType = "blob"
  
  return request({
    url:`/api/out0060/Out0060/exportTransRpt`,
    method:'POST',
    meta:{apiVersion:'1.0.0'},
    headers:{ 'Content-Type': 'application/json;charset=utf8' },
    data,
    responseType: responseType
  })
}